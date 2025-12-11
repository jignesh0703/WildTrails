import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        scientificName: {
            type: String
        },
        species: {
            type: String,
            enum: [
                "Bird",
                "Amphibian",
                "Invertebrate",
                "Reptile",
                "Mammal"
            ],
            required: true
        },
        description: {
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
        iucn_status: {
            type: String,
            enum: [
                "Least Concern",
                "Near Threatened",
                "Vulnerable",
                "Endangered",
                "Critically Endangered",
                "Extinct in the Wild",
                "Extinct"
            ],
            required: true
        },
        facts: {
            species: {
                value: String,
                description: String
            },
            foundIn: {
                value: String,
                description: String
            },
            habitat: {
                value: String,
                description: String
            },
            diet: {
                value: String,
                description: String
            },
            averageSize: {
                value: String,
                description: String
            },
            lifeSpan: {
                value: String,
                description: String
            },
            zooLocation: {
                value: String,
                description: String
            },
            behaviour: {
                value: String,
                description: String
            }
        },
    },
    {
        timestamps: true
    }
);

const animalModel = mongoose.model('animal', animalSchema);

export default animalModel