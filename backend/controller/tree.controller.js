import treeModel from "../model/tree.model.js";
import { uploadToS3, deleteFromS3 } from "../utils/awsutils.js";

const addTree = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403)
                .json({
                    success: false,
                    message: 'User not allowed to add a tree!'
                });
        }

        const { name, scientificName, description, type, height, location, habitat, habitatDec, foundIn, foundIndec, lifespan, lifespanDec, ecologicalRole, ecologicalRoleDec, conservationStatus, conservationStatusDec } = req.body;

        // List only REQUIRED fields
        const requiredFields = [
            'name',
            'description',
            'type',
            'location'
        ];

        // Find missing required
        const missing = requiredFields.filter(field => !req.body[field]);

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `${missing.join(", ")} is required`
            });
        }

        const exists = await treeModel.findOne({
            $or: [{ name }, { scientificName }]
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Tree already exists with same name or scientific name!'
            });
        }

        // File validations
        const { mainImage, imageFiles } = req.files || {};
        if (!mainImage) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Main image is required!'
                });
        }

        if (!imageFiles) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Images are required!'
                });
        }

        const mainImageUrl = await uploadToS3(mainImage[0], "trees");

        const imagesUrls = [];
        for (const file of imageFiles) {
            const url = await uploadToS3(file, "trees");
            imagesUrls.push(url);
        }

        // Save to DB
        const tree = await treeModel.create({
            name,
            scientificName,
            description,
            type,
            height,
            location,
            main_image: mainImageUrl,
            images: imagesUrls,
            facts: {
                habitat: { value: habitat, description: habitatDec },
                foundIn: { value: foundIn, description: foundIndec },
                lifespan: { value: lifespan, description: lifespanDec },
                ecologicalRole: { value: ecologicalRole, description: ecologicalRoleDec },
                conservationStatus: { value: conservationStatus, description: conservationStatusDec }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Tree added successfully!",
            data: {
                tree
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
    }
}

const updateTree = async (req, res) => {
    try {
        const user = req.user;

        // Only admins can update trees
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can update a tree!'
            });
        }

        const treeId = req.params.id;
        const {
            name,
            scientificName,
            description,
            type,
            height,
            location,
            habitat,
            habitatDec,
            foundIn,
            foundIndec,
            lifespan,
            lifespanDec,
            ecologicalRole,
            ecologicalRoleDec,
            conservationStatus,
            conservationStatusDec
        } = req.body;

        // Find the tree by ID
        const tree = await treeModel.findById(treeId);
        if (!tree) {
            return res.status(404).json({
                success: false,
                message: 'Tree not found!'
            });
        }

        // Update main image if provided
        if (req.files?.mainImage) {
            const mainImageUrl = await uploadToS3(req.files.mainImage[0], "trees");
            tree.main_image = mainImageUrl;
        }

        // Update additional images if provided
        if (req.files?.imageFiles) {
            const imagesUrls = [];
            for (const file of req.files.imageFiles) {
                const url = await uploadToS3(file, "trees");
                imagesUrls.push(url);
            }
            tree.images = imagesUrls;
        }

        // Update other fields if provided
        if (name) tree.name = name;
        if (scientificName) tree.scientificName = scientificName;
        if (description) tree.description = description;
        if (type) tree.type = type;
        if (height) tree.height = height;
        if (location) tree.location = location;

        // Update nested facts
        if (habitat) tree.facts.habitat.value = habitat;
        if (habitatDec) tree.facts.habitat.description = habitatDec;
        if (foundIn) tree.facts.foundIn.value = foundIn;
        if (foundIndec) tree.facts.foundIn.description = foundIndec;
        if (lifespan) tree.facts.lifespan.value = lifespan;
        if (lifespanDec) tree.facts.lifespan.description = lifespanDec;
        if (ecologicalRole) tree.facts.ecologicalRole.value = ecologicalRole;
        if (ecologicalRoleDec) tree.facts.ecologicalRole.description = ecologicalRoleDec;
        if (conservationStatus) tree.facts.conservationStatus.value = conservationStatus;
        if (conservationStatusDec) tree.facts.conservationStatus.description = conservationStatusDec;

        // Save updates
        await tree.save();

        return res.status(200).json({
            success: true,
            message: 'Tree updated successfully!',
            data: { tree }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const deleteTree = async (req, res) => {
    try {
        const user = req.user;

        // Only admins can delete trees
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can delete a tree!'
            });
        }

        const treeId = req.params.id;

        // Find the tree by ID
        const tree = await treeModel.findById(treeId);
        if (!tree) {
            return res.status(404).json({
                success: false,
                message: 'Tree not found!'
            });
        }

        // Delete images from S3
        if (tree.main_image) {
            await deleteFromS3(tree.main_image);
        }
        if (tree.images && tree.images.length > 0) {
            for (const imageUrl of tree.images) {
                await deleteFromS3(imageUrl);
            }
        }

        // Delete from database
        await treeModel.findByIdAndDelete(treeId);

        return res.status(200).json({
            success: true,
            message: 'Tree deleted successfully!',
            data: { tree }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const fetchAllTrees = async (req, res) => {
    try {
        // Fetch all trees from the database
        const fetchTrees = await treeModel.find({});

        // If no trees are found
        if (!fetchTrees || fetchTrees.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No trees found!'
            });
        }

        // Return the fetched trees
        return res.status(200)
            .json({
                success: true,
                message: 'Trees fetched successfully!',
                data: {
                    fetchTrees,
                    length: fetchTrees.length
                }
            })
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: 'Server error!'
            })
    }
}

export {
    addTree,
    updateTree,
    deleteTree,
    fetchAllTrees
}
