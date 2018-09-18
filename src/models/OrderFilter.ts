export class OrderFilter {
    public priceFrom: number = 0;
    public priceTo: number = 0;
    public weight: number = 0;
    public reset: boolean = false;

    constructor(priceFrom: number, priceTo: number, weight: number, reset: boolean = false) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.weight = weight;
        this.reset = reset;
    }
}
