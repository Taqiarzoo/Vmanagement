export class authModel{
    email: string;
    name: string;
    contact: number;
    aadhar: number;
    password: string;
    constructor
    (
        email?: string,
        name?: string,
        contact?: number,
        aadhar?: number,
        password?: string,
        
    )
    {
        this.email=email;
        this.name=name;
        this.contact=contact;
        this.aadhar=aadhar;
        this.password=password;
    }

}