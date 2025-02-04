import { images } from "../constants";

export const shopNowData = [
    {
        image: images.shopNow,
        title: "THE MTE",
        description: "נבנה לגשם. מיועד לרוח. תוכנן לקור.",
        link: "https://www.vans.co.il/hdw-trndi/more/mte.html",
        text: "SHOP NOW"
    },
    {
        image: images.knuSkools,
        title: "THE KNU SKOOL",
        description: "קלסיקה מודרנית בהשארת שנות ה90'",
        link: "https://www.vans.co.il/hdw-trndi/classicss/knuskool.html",
        text: "SHOP NOW"
    },
    {
        image: images.menWomenSquare,
        title: "MEN'S OUTFIT",
        description: null,
        link: "https://www.vans.co.il/gbrim/bigvd.html",
        text: "SHOP NOW"
    },
    {
        image: images.menWomenSquareTwo,
        title: "WOMEN'S OUTFIT",
        description: null,
        link: "https://www.vans.co.il/nwim/bigvd.html",
        text: "SHOP NOW"
    }
];
export const newsData = [
    { id: "1", link: "https://www.vans.co.il/dgmi-h-ultrarange-neo-vr3", image: images.blog1, title: "דגמי ה- ULTRARANGE NEO VR3 עוצבו מחדש עבור קיץ 2024" },
    { id: "2", link: "https://www.vans.co.il/best-vans-shoes-for-back-to-school", image: images.blog2, title: "הנעליים הכי טובות של Vans לשנת הלימודים החדשה" },
    { id: "3", link: "https://www.vans.co.il/mtenews", image: images.blog3, title: " לקולקציית MTE™" },
    { id: "4", link: "https://www.vans.co.il/newzahaba", image: images.blog4, title: "ואנס והסקייטרית ביאטריס דומונד מציגים עיצוב חדש לנעל ה- Zahba" },
    { id: "5", link: "https://www.vans.co.il/dgmi-h-ultrarange-neo-vr3", image: images.blog1, title: "דגמי ה- ULTRARANGE NEO VR3 עוצבו מחדש עבור קיץ 2024" },
    { id: "6", link: "https://www.vans.co.il/best-vans-shoes-for-back-to-school", image: images.blog2, title: "הנעליים הכי טובות של Vans לשנת הלימודים החדשה" },
    { id: "7", link: "https://www.vans.co.il/mtenews", image: images.blog3, title: " לקולקציית MTE™" },
    { id: "8", link: "https://www.vans.co.il/newzahaba", image: images.blog4, title: "ואנס והסקייטרית ביאטריס דומונד מציגים עיצוב חדש לנעל ה- Zahba" },
];
export const shopbyData = [
    {
        title: "MEN",
        image: images.categoriesMen,
        url: "https://www.vans.co.il/gbrim.html",
        children: [
            {
                name: "SHOES",
                link: "https://www.vans.co.il/gbrim/neliim.html"
            },
            {
                name: "CLOTHING",
                link: "https://www.vans.co.il/gbrim/bigvd.html"
            },
            {
                name: "ACCESSORIES",
                link: "https://www.vans.co.il/gbrim.html"
            },
        ]
    },
    {
        title: "WOMEN",
        image: images.categoriesWomen,
        url: "https://www.vans.co.il/nwim.html",
        children: [
            {
                name: "SHOES",
                link: "https://www.vans.co.il/nwim/neliim/viewall.html"
            },
            {
                name: "CLOTHING",
                link: "https://www.vans.co.il/gbrim/bigvd/viewallmencloths.html"
            },
            {
                name: "ACCESSORIES",
                link: "https://www.vans.co.il/nwim/abizrim/viewallacc.html"
            },
        ]
    },
    {
        title: "KIDS",
        image: images.categoriesKids,
        url: "https://www.vans.co.il/ildim.html",
        children: [
            {
                name: "SHOES",
                link: "https://www.vans.co.il/ildim/neliim/viewallkids.html"
            },
            {
                name: "CLOTHING",
                link: "https://www.vans.co.il/ildim/bigvd/viewallkidscloths.html"
            },
            {
                name: "ACCESSORIES",
                link: "https://www.vans.co.il/ildim/abizrim/viewallkidsacc.html"
            },
        ]
    }
]