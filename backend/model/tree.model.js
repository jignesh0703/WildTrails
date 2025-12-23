import mongoose from "mongoose";

const treeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        scientificName: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: [
                "Deciduous",
                "Evergreen",
                "Coniferous",
                "Palm",
                "Other"
            ],
            required: true
        },
        location: {
            type: String,
            required: true
        },
        main_image: {
            type: String,
            required: true
        },
        images: [
            {
                type: String
            }
        ],
        facts: {
            habitat: {
                value: String,
                description: String
            },
            foundIn: {
                value: String,
                description: String
            },
            lifespan: {
                value: String,
                description: String
            },
            ecologicalRole: {
                value: String,
                description: String
            },
            conservationStatus: {
                value: String,
                description: String
            }
        },
    },
    {
        timestamps: true
    }
);

const treeModel = mongoose.model('tree', treeSchema);

export default treeModel;