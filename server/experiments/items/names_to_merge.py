from dataclasses import dataclass


@dataclass
class Merger:
    target: str
    names: list[str]


hookas = Merger(
    "fajka wodna",
    [
        "fajka wodna",
        "szisza fajka",
    ],
)

bai_mu_dan = Merger(
    "bai mu dan królowa herbat",
    [
        "bai mu dan królowa herbat",
        "bai mu dan",
    ],
)

masala_chai = Merger(
    "masala tea",
    [
        "herbata yogi",
        "herbata yogi masala",
        "masala tea",
    ],
)

dan_cong = Merger(
    "feng huang dan cong feniks",
    [
        "feng huang dan cong",
        "feng huang dan cong feniks",
    ],
)

ya_bao = Merger(
    "ya bao pączek, który jest skarbem",
    [
        "ya bao pączek, który jest skarbem",
        "ya bao",
    ],
)

bi_luo = Merger(
    "bi luo chung tai hu spiralki wiosny",
    [
        "bi luo chung tai hu spiralki wiosny",
        "bi luo chung tai hu ",
    ],
)

long_jing = Merger(
    "long jing tygrysie źródło",
    ["long jing tygrysie źródło", "long jing cha „tiger spring“"],
)

gui_hua = Merger(
    "gui hua cha osmanthus",
    [
        "gui hua cha osmanthus",
        "gui hua cha",
    ],
)

tai_mu_long_zhu = Merger(
    "tai mu long zhu smocze oczy",
    [
        "tai mu long zhu smocze oczy",
        "tai mu long zhu",
    ],
)

tie_guan_yin_jade = Merger(
    "tie guan yin jade bio żelazna bogini miłosiardzia jadeitowa",
    [
        "tie gua yin jade bio żelazna bogini miłosiardzia jadeitowa",
        "tie guan yin bio",
    ],
)

gyokuro = Merger(
    "gyokuro kioto",
    [
        "gyokuro kioto",
        "gyokuro kyoto",
    ],
)

lao_shu = Merger(
    "lao shu bing cha książę dzik",
    [
        "lao shu bing cha książę dzik",
        "lao shu bing cha dzik",
        "lao shu bing cha król dzik",
        "lao shu bing cha",
    ],
)

ho_chi_minh = Merger(
    "ho-chi-minha lemoniada",
    [
        "ho-chi-minha lemoniada",
        "lemoniada ho-chi-minha",
    ],
)

werbena = Merger(
    "lemoniada z werbeną cytrynową",
    ["lemoniada z werbeną cytrynową", "lemoniada werbenowa"],
)

ali_shan = Merger(
    "alishan jin xuan",
    [
        "alishan jin xuan",
        "ali shan jin xuan",
    ],
)

shui_xian = Merger(
    "wuyi shan shui xian",
    [
        "wuyi shan shui xian",
        "wu yi shan shui xian",
    ],
)

kombucha = Merger(
    "napój kombucha",
    [
        "napój kombucha",
        "cudo kombucha",
    ],
)

lapsang = Merger(
    "zheng shan xiao zhong lapsang",
    [
        "zheng shan xiao zhong lapsang",
        "zheng shan xiao zhong",
    ],
)

bomb = Merger(
    "bomba kwiatowa",
    [
        "bomba kwiatowa",
        "bomba kwiatowa camelia",
    ],
)

da_hong_pao = Merger(
    "wuyi da hong pao wielka purpurowa szata",
    [
        "wuyi da hong pao wielka purpurowa szata",
        "da hong pao",
    ],
)

mao_jian = Merger(
    "weishan mao jian zachmurzone szczyty",
    [
        "weishan mao jian zachmurzone szczyty",
        "weishan mao jian",
    ],
)

jin_zhen = Merger(
    "jin zhen złote szpilki",
    ["jin zhen złote szpilki", "jin zhen gold"],
)

earl_grey = Merger(
    "earl grey",
    [
        "earl grey",
        "ceylon earl grey",
    ],
)

cookies = Merger(
    "ciasteczka owsiane herbatniki",
    [
        "ciasteczka owsiane herbatniki",
        "ciasteczka owsiane",
        "herbatniki ciastka owsiane",
    ],
)

names: list[Merger] = [
    hookas,
    bai_mu_dan,
    masala_chai,
    dan_cong,
    ya_bao,
    bi_luo,
    gui_hua,
    tai_mu_long_zhu,
    tie_guan_yin_jade,
    gyokuro,
    lao_shu,
    ho_chi_minh,
    werbena,
    ali_shan,
    shui_xian,
    kombucha,
    lapsang,
    bomb,
    da_hong_pao,
    mao_jian,
    jin_zhen,
    earl_grey,
    cookies,
]
