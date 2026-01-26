class Car {
    constructor(car) {
        this.color = car.color,
        this.name = car.name
    }
}

const Ford = new Car(
    { name: "Mustang", color: "red" }
)

class Truck extends Car {
    constructor(car) {
        super(car)
        this.type = "truck"
    }
}

const Scadia = new Truck(
    {color: "blue", name: "Scadia"}
)
console.log(Scadia) 
//{color: "blue", name: "Scadia", type: "truck"}