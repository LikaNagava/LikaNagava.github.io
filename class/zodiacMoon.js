class ZodiacMoon extends ZodiacSigns {
    constructor(title, image, desc, month, day) {
        super(title, image, desc, month, day);
    }

    getMoonInfo() {
        return `🌙 Лунный знак (${this.title}): ${this.desc} Это ваши эмоции, инстинкты и внутренний мир.`;
    }
}