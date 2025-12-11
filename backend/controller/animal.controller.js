import animalModel from "../model/animal.model.js";
import { uploadToS3 } from "../utils/awsutils.js";

const addanimal = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403)
                .json({
                    success: false,
                    message: 'User dont allow to add an animal!'
                });
        }

        const { name, scientificName, species, description, iucn_status, speciesDec, foundIn, foundIndec, habitat, habitatDec, diet, dietDec, averageSize, averageSizeDec, lifeSpan, lifeSpanDec, zooLocation, zooLocationDec, behaviour, behaviourDec } = req.body;

        // List only REQUIRED fields
        const requiredFields = [
            'name',
            'scientificName',
            'species',
            'description',
            'iucn_status',
            'foundIn',
            'habitat',
            'diet',
            'averageSize',
            'lifeSpan',
            'zooLocation',
            'behaviour'
        ];

        // Find missing requir
        const missing = requiredFields.filter(fileds => !req.body[fileds]);

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `${missing.join(", ")} is required`
            });
        }

        const exists = await animalModel.findOne({
            $or: [{ name }, { scientificName }]
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Animal already exists with same name or scientific name!'
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

        const mainImageUrl = await uploadToS3(mainImage[0], "animals");

        const imagesUrls = [];
        for (const file of imageFiles) {
            const url = await uploadToS3(file, "animals");
            imagesUrls.push(url);
        }

        // Save to DB
        const animal = await animalModel.create({
            name,
            scientificName,
            species,
            description,
            main_image: mainImageUrl,
            images: imagesUrls,
            iucn_status,
            facts: {
                species: { value: species, description: speciesDec },
                foundIn: { value: foundIn, description: foundIndec },
                habitat: { value: habitat, description: habitatDec },
                diet: { value: diet, description: dietDec },
                averageSize: { value: averageSize, description: averageSizeDec },
                lifeSpan: { value: lifeSpan, description: lifeSpanDec },
                zooLocation: { value: zooLocation, description: zooLocationDec },
                behaviour: { value: behaviour, description: behaviourDec }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Animal added successfully!",
            data: {
                animal
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
    }
}

const fetchAllAnimals = async (req, res) => {
    try {
        // Fetch all animals from the database
        const fetchAnimals = await animalModel.find({});

        // If no animals are found
        if (!fetchAnimals || fetchAnimals.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No animals found!'
            });
        }

        // Return the fetched animals
        return res.status(200)
            .json({
                success: false,
                message: 'Animals fetched successfully!',
                data: {
                    fetchAnimals,
                    length: fetchAnimals.length
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

const updateAnimal = async (req, res) => {
    try {
        const user = req.user;

        // Only admins can update animals
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can update an animal!'
            });
        }

        const animalId = req.params.id;
        const {
            name,
            scientificName,
            species,
            description,
            iucn_status,
            speciesDec,
            foundIn,
            foundIndec,
            habitat,
            habitatDec,
            diet,
            dietDec,
            averageSize,
            averageSizeDec,
            lifeSpan,
            lifeSpanDec,
            zooLocation,
            zooLocationDec,
            behaviour,
            behaviourDec
        } = req.body;

        // Find the animal by ID
        const animal = await animalModel.findById(animalId);
        if (!animal) {
            return res.status(404).json({
                success: false,
                message: 'Animal not found!'
            });
        }

        // Update main image if provided
        if (req.files?.mainImage) {
            const mainImageUrl = await uploadToS3(req.files.mainImage[0], "animals");
            animal.main_image = mainImageUrl;
        }

        // Update additional images if provided
        if (req.files?.imageFiles) {
            const imagesUrls = [];
            for (const file of req.files.imageFiles) {
                const url = await uploadToS3(file, "animals");
                imagesUrls.push(url);
            }
            animal.images = imagesUrls;
        }

        // Update other fields if provided
        if (name) animal.name = name;
        if (scientificName) animal.scientificName = scientificName;
        if (species) animal.species = species;
        if (description) animal.description = description;
        if (iucn_status) animal.iucn_status = iucn_status;

        // Update nested facts
        if (speciesDec) animal.facts.species.description = speciesDec;
        if (foundIn) animal.facts.foundIn.value = foundIn;
        if (foundIndec) animal.facts.foundIn.description = foundIndec;
        if (habitat) animal.facts.habitat.value = habitat;
        if (habitatDec) animal.facts.habitat.description = habitatDec;
        if (diet) animal.facts.diet.value = diet;
        if (dietDec) animal.facts.diet.description = dietDec;
        if (averageSize) animal.facts.averageSize.value = averageSize;
        if (averageSizeDec) animal.facts.averageSize.description = averageSizeDec;
        if (lifeSpan) animal.facts.lifeSpan.value = lifeSpan;
        if (lifeSpanDec) animal.facts.lifeSpan.description = lifeSpanDec;
        if (zooLocation) animal.facts.zooLocation.value = zooLocation;
        if (zooLocationDec) animal.facts.zooLocation.description = zooLocationDec;
        if (behaviour) animal.facts.behaviour.value = behaviour;
        if (behaviourDec) animal.facts.behaviour.description = behaviourDec;

        // Save updates
        await animal.save();

        return res.status(200).json({
            success: true,
            message: 'Animal updated successfully!',
            data: { animal }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

export {
    addanimal,
    fetchAllAnimals,
    updateAnimal
}
