class Organization {
    owner: string = "";
    name: string = "Organization";
    rules: Rule[] = [];
}

class Rule {
    owner: string = "";
    uuid: string = "";
    name: string = "Access Rule";
    active: boolean = false;
    index: number = 0;
    users: User[] = [];
}

class User {
    owner: string = "";
    name: string = "User";
    active: boolean = false;
    index: number = 0;
}

export {
    Organization, Rule, User
}