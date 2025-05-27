export interface Banner {
    id: number;
    image: string;
    link: string;
    title: string | null;
}

export interface BannerSectionData {
    top: {
        slider: Banner[];
        single: Banner[];
    };
    middle: {
        slider: Banner[];
        single: Banner[];
    };
    bottom: {
        slider: Banner[];
        single: Banner[];
    };
} 