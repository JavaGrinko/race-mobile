let profile = {
    coins: 0,
    activeCar: 'DEMO_CAR',
    availableCars: ['DEMO_CAR']
};

export const getProfile = () => {
    return profile;
}

export const setProfile = (prof) => {
    profile = prof;
    console.log(profile);
}

export const checkAvailableCar = (car) => {
    for (let c of getProfile().availableCars) {
        if (c === car) return true;
    }
    return false;
}