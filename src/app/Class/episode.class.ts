export class Episode {
    private id: number;
    private link: string;
    private img: string;
    private title: string;
    private view: number;

    getid(){
        return this.id;
    }
    setid(id: number){
        this.id = id;
    }
    getlink(){
        return this.link;
    }
    setlink(link: string){
        this.link = link;
    }
    getimg(){
        return this.img
    }
    setimg(img: string){
        this.img = img;
    }
    gettitle(){
        return this.title
    }
    settitle(title: string) {
        this.title = title
    }
    getview(){
        return this.view
    }
    setview(view: number){
        this.view = view
    }
}