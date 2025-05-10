class CurrentUserDto {

    // Constructor
    constructor(user) {
        this.full_name = user.first_name + " " + user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
    }
}

module.exports = CurrentUserDto;