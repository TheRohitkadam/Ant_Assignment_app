export interface RandomUserType {
    gender: string;
    name: {
        title: string
        first: string
        last: string
    };
    location: {
        street: {
            number: any;
            name: string;
        };
        city: string
        state: string
        country: string
        postcode: any;
        coordinates: {
            latitude: string
            longitude:string
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: any;
    };
    registered: {
        date: string;
        age: any;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string | null;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}
