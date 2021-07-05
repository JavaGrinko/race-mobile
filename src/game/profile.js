export default class Profile {

    constructor() {
        this.load();
    }

    load = () => {
        let profileString = localStorage.getItem("profile");
        if (profileString) {
            let profile = JSON.parse(profileString);
            for (const key of Object.keys(profile)) {
                this[key] = profile[key];
            }
        } else {
            this.coins = 1000;
            this.activeSkin = "DEMO_CAR";
            this.availableSkins = ["DEMO_CAR"];
        } 
    }

    save = () => {
        let profileString = JSON.stringify(this);
        localStorage.setItem("profile", profileString);
    }

    buy = (skinName, cost) => {
        if (cost > this.coins) {
            return false;
        }
        this.coins -= cost;
        this.availableSkins.push(skinName);
        this.changeActiveSkin(skinName);
        this.save();
        return true;
    }

    changeActiveSkin = (skinName) => {
        this.activeSkin = skinName;
        this.save();
    }

    checkAvailableSkin = (skinName) => {
        return this.availableSkins.includes(skinName);
    }
}