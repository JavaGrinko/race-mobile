import { ROADS } from "./roads";

export const LEVELS = {
    DEMO1: {
        backgroundSrc: 'images/demo1.png',
        width: 1920,
        height: 1080,
        spawn: {
            x: 766,
            y: 720,
            angle: 90
        },
        roads: [{
            ...ROADS.DRY_ASPHALT_ROAD, 
            x: 469, 
            y: 665, 
            width:  875 - 469,
            height: 802 - 665
        }],
        walls: []
    },
    DEV: {
        backgroundSrc: 'images/track.jpg',
        width: 1061,
        height: 1500,
        roads: [],
        walls: []
    },
    ROAD_TEST: {
        backgroundSrc: 'images/background.png',
        width: 1600,
        height: 1000,
        walls: [{
            x: 10,
            y: 10,
            width: 1580,
            height: 50,
            color: "#ff0000",
            angle: 45
        }],
        roads: [{
            ...ROADS.ICE_ROAD, 
            x: 10, 
            y: 10, 
            width: 1500,
            height: 200
        }, {
            ...ROADS.DRY_ASPHALT_ROAD, 
            x: 10, 
            y: 220, 
            width: 1500,
            height: 200
        }, {
            ...ROADS.WET_ASPHALT_ROAD, 
            x: 10, 
            y: 430, 
            width: 1500,
            height: 200
        }, {
            ...ROADS.DRY_DIRT_ROAD, 
            x: 10, 
            y: 640, 
            width: 1500,
            height: 200
        }, {
            ...ROADS.WET_DIRT_ROAD, 
            x: 10, 
            y: 850, 
            width: 1500,
            height: 200
        }]
    }
}