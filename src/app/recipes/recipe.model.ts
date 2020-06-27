export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name, desc, imgPath){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
    }
}
