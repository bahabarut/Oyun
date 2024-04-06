var oyunDevamEdiyor = true;
var yesilHizi = 10;
var kirmiziHizi = 10;
var yesilSkor = 0;
var kirmiziSkor = 0;
var interv = null;
$(document).ready(function () {
    $("#Oyuncu1").attr("data-alan", AlanHesapla($("#Oyuncu1").width()));
    $("#Oyuncu2").attr("data-alan", AlanHesapla($("#Oyuncu2").width()));

    Baslat();
});
$(document).on("keydown", (e) => {
    if (tuslar[e.which]) tuslar[e.which].basili = true;
});
$(document).on("keyup", (e) => {
    if (tuslar[e.which]) tuslar[e.which].basili = false;

});

$("#SifirlaBtn").click(function () {
    location.reload();
    //CapHesapla("379.94");
});
function RandomUret(min, max) {
    return Math.floor(min + Math.random() * max);
}
function RandomElementlerEkle(min, max) {
    var alan = $("#OyunAlan");
    //ekrandaki nesnelerin sayisi
    var sayac = RandomUret(min, max);
    for (var i = 0; i < sayac; i++) {
        var boyut = RandomUret(5, 20);
        var newEl = document.createElement("span");
        newEl.setAttribute("class", "RandomEl");
        newEl.classList.add("elem");
        newEl.setAttribute("data-alan", AlanHesapla(boyut));
        newEl.style.width = `${boyut.toString()}px`;
        newEl.style.height = `${boyut.toString()}px`;

        newEl.style.top = `${RandomUret(1, 600).toString()}px`;
        newEl.style.left = `${RandomUret(1, 1350).toString()}px`;
        alan.append(newEl);
    }
}

function Baslat() {
    RandomElementlerEkle(5, 20);
    interv = setInterval(function () {
        var oyuncu1 = $("#Oyuncu1");
        var oyuncu2 = $("#Oyuncu2");
        //carpraz gitmek icin
        if (tuslar[65].basili && tuslar[87].basili) YeniKonumHesapla(oyuncu1, "solyuk", yesilHizi);
        if (tuslar[65].basili && tuslar[83].basili) YeniKonumHesapla(oyuncu1, "solalt", yesilHizi);
        if (tuslar[68].basili && tuslar[87].basili) YeniKonumHesapla(oyuncu1, "sagyuk", yesilHizi);
        if (tuslar[68].basili && tuslar[83].basili) YeniKonumHesapla(oyuncu1, "sagalt", yesilHizi);

        if (tuslar[37].basili && tuslar[38].basili) YeniKonumHesapla(oyuncu2, "solyuk", kirmiziHizi);
        if (tuslar[37].basili && tuslar[40].basili) YeniKonumHesapla(oyuncu2, "solalt", kirmiziHizi);
        if (tuslar[39].basili && tuslar[38].basili) YeniKonumHesapla(oyuncu2, "sagyuk", kirmiziHizi);
        if (tuslar[39].basili && tuslar[40].basili) YeniKonumHesapla(oyuncu2, "sagalt", kirmiziHizi);
        //tek yon gitmek icin
        if (tuslar[65].basili && !tuslar[87].basili && !tuslar[83].basili) YeniKonumHesapla(oyuncu1, "sol", yesilHizi);
        if (tuslar[87].basili && !tuslar[68].basili && !tuslar[65].basili) YeniKonumHesapla(oyuncu1, "yuk", yesilHizi);
        if (tuslar[68].basili && !tuslar[83].basili && !tuslar[87].basili) YeniKonumHesapla(oyuncu1, "sag", yesilHizi);
        if (tuslar[83].basili && !tuslar[68].basili && !tuslar[65].basili) YeniKonumHesapla(oyuncu1, "alt", yesilHizi);

        if (tuslar[37].basili && !tuslar[38].basili && !tuslar[40].basili) YeniKonumHesapla(oyuncu2, "sol", kirmiziHizi);
        if (tuslar[38].basili && !tuslar[37].basili && !tuslar[39].basili) YeniKonumHesapla(oyuncu2, "yuk", kirmiziHizi);
        if (tuslar[39].basili && !tuslar[38].basili && !tuslar[40].basili) YeniKonumHesapla(oyuncu2, "sag", kirmiziHizi);
        if (tuslar[40].basili && !tuslar[37].basili && !tuslar[39].basili) YeniKonumHesapla(oyuncu2, "alt", kirmiziHizi);
    }, 18);
}

function YeniKonumHesapla(Oyuncu, Yon, hiz) {
    var SinirGenislik = $("#OyunAlan").width() - Oyuncu.width();
    var SinirYukseklik = $("#OyunAlan").height() - Oyuncu.width();
    var OyuncuKonumLeft = Oyuncu.position().left;
    var OyuncuKonumTop = Oyuncu.position().top;

    switch (Yon) {
        case "sol": OyuncuKonumLeft -= hiz; break;//sol a
        case "yuk": OyuncuKonumTop -= hiz; break;//yukari w
        case "sag": OyuncuKonumLeft += hiz; break;//sag d
        case "alt": OyuncuKonumTop += hiz; break;//asagi s

        case "solyuk":
            OyuncuKonumLeft -= hiz;
            OyuncuKonumTop -= hiz;
            break;
        case "solalt":
            OyuncuKonumLeft -= hiz;
            OyuncuKonumTop += hiz;
            break;
        case "sagyuk":
            OyuncuKonumLeft += hiz;
            OyuncuKonumTop -= hiz;
            break;
        case "sagalt":
            OyuncuKonumLeft += hiz;
            OyuncuKonumTop += hiz;
            break;
    }

    //eger en sola geldiyse daha kucuk olamaz
    if (OyuncuKonumLeft < 0) OyuncuKonumLeft = 0;
    //eger en saga geldiyse daha buyuk olamaz
    if (OyuncuKonumLeft > SinirGenislik) OyuncuKonumLeft = SinirGenislik;
    //eger en uste geldiyse daha buyuk olamaz
    if (OyuncuKonumTop < 0) OyuncuKonumTop = 0;
    //eger en alta geldiyse daha buyuk olamaz
    if (OyuncuKonumTop > SinirYukseklik) OyuncuKonumTop = SinirYukseklik;

    Oyuncu.css("left", OyuncuKonumLeft + "px");
    Oyuncu.css("top", OyuncuKonumTop + "px");
    ToplarCakisti(Oyuncu);
}
var tuslar = {
    65: { basili: false },
    87: { basili: false },
    68: { basili: false },
    83: { basili: false },

    37: { basili: false },
    38: { basili: false },
    39: { basili: false },
    40: { basili: false },
};
function OyunDevamEdiyorMu() {
    return Object.values(tuslar).some(x => x.basili);
}
function ToplarCakisti(oyuncu) {
    var elementler = $(".elem");
    elementler.each((index, el) => {
        var elK = $(el)[0].getBoundingClientRect();
        var oyuncuK = $(oyuncu)[0].getBoundingClientRect();

        var dikeyKosul = oyuncuK.top < elK.bottom && oyuncuK.bottom > elK.top;
        var yatayKosul = oyuncuK.left < elK.right && oyuncuK.right > elK.left;
        var kosul = dikeyKosul && yatayKosul;
        if (kosul && !($(el).is(".Oyuncular"))) {
            var yeniAlan = AlanHesapla($(el).width());
            $(oyuncu).css("width", CapHesapla(yeniAlan) + $(oyuncu).width() + "px");
            $(oyuncu).css("height", CapHesapla(yeniAlan) + $(oyuncu).height() + "px");
            $(el).remove();
            RandomElementlerEkle(1, 1);
            if ($(oyuncu).is("#Oyuncu1"))
                yesilHizi -= CapHesapla(yeniAlan).toFixed(2) / 45;
            if ($(oyuncu).is("#Oyuncu2"))
                kirmiziHizi -= CapHesapla(yeniAlan).toFixed(2) / 45;
        }
        if (kosul && ($(oyuncu).is("#Oyuncu1") && $(el).is("#Oyuncu2") || $(oyuncu).is("#Oyuncu2") && $(el).is("#Oyuncu1"))) {
            if ($("#Oyuncu1").width() > $("#Oyuncu2").width()) {
                yesilSkor += 1;
                SkorGuncelle("#yesilSkor", yesilSkor, "Yeþil", "green");
            }
            else {
                kirmiziSkor += 1;
                SkorGuncelle("#kirimiziSkor", kirmiziSkor, "Kýrmýzý", "red");
            }
            OynamayaDevamEt();
            clearInterval(interv);
            Baslat();
            setTimeout(function () { $("#sonuc").empty(); }, 2000);
        }
    });
}
function SkorGuncelle(skorElm, skor, kazananRenk, color) {
    $(skorElm).text(skor.toString());
    $("#sonuc").text(kazananRenk + " Kazandý");
    $("#sonuc").css("color", color);
}
function AlanHesapla(cap) {
    return (((cap / 2) ** 2) * 3.14).toFixed(2);
}
function CapHesapla(alan) {
    var cap = Math.sqrt((alan / 3.14));
    return cap;
}
function OynamayaDevamEt() {
    $("#OyunAlan").empty();
    $("#OyunAlan").html("<span id='Oyuncu1' class='Oyuncular elem'></span> <span id='Oyuncu2' class='Oyuncular elem'></span>");
}
