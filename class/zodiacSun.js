class ZodiacSun extends ZodiacSigns {
    constructor(title, image, desc, month, day) {
        super(title, image, desc, month, day);
    }
    getSunInfo() {
        return `☀️ Солнечный знак (${this.title}): ${this.desc} Это ваше "Я", ваша личность и сознание.`;
    }
}