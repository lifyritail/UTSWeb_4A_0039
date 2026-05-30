$(document).ready(function () {

    const serviceDetails = {
        "Hand Bouquet": {
            title: "Hand Bouquet",
            desc: "Rangkaian tangan dengan kombinasi bunga segar dan ribbon sederhana, cocok untuk hadiah personal atau acara kecil.",
            price: "Mulai harga 30k",
            duration: "2-3 hari kerja"
        },
        "Flower Box": {
            title: "Flower Box",
            desc: "Box bouquet dengan tampilan rapi dan praktis, cocok kalau ingin hadiah yang langsung bisa diberikan tanpa banyak styling.",
            price: "Mulai Rp 420k",
            duration: "3-4 hari kerja"
        },
        "Graduation Bouquet": {
            title: "Graduation Bouquet",
            desc: "Bouquet untuk momen kelulusan dengan warna yang lebih terang dan tampilan yang tetap mudah dipresentasikan.",
            price: "Mulai Rp 500k",
            duration: "3-5 hari kerja"
        },
        "Custom Bouquet": {
            title: "Custom Bouquet",
            desc: "Desain sesuai preferensi warna, jumlah bunga, dan tujuan hadiah, jadi lebih spesifik untuk kebutuhan tertentu.",
            price: "Mulai Rp 650k",
            duration: "4-6 hari kerja"
        }
    };

    const updateGalleryStatus = () => {
        const activeFilter = $(".filterBtn.active").attr("data-filter");
        const keyword = $("#gallerySearch").val().toLowerCase().trim();

        $(".gallery-item").each(function () {
            const matchesFilter = activeFilter === "all" || $(this).hasClass(activeFilter);
            const matchesKeyword = keyword === "" || $(this).attr("data-name").toLowerCase().includes(keyword);
            $(this).toggle(matchesFilter && matchesKeyword);
        });
    };

    $(".filterBtn").click(function () {
        $(".filterBtn").removeClass("active");
        $(this).addClass("active");
        updateGalleryStatus();
    });

    $("#gallerySearch").on("keyup input", function () {
        updateGalleryStatus();
    });

    $(".service-card").click(function () {
        $(".service-card").removeClass("is-active");
        $(this).addClass("is-active");

        const serviceName = $(this).find("h3").text();
        const detail = serviceDetails[serviceName];

        if (detail) {
            $("#detailTitle").text(detail.title);
            $("#detailDesc").text(detail.desc);
            $("#detailPrice").text(detail.price);
            $("#detailDuration").text(detail.duration);
        }
    });

    $(".service-card").first().addClass("is-active").trigger("click");

    $(".counter").each(function () {
        let target = $(this).data("target");

        $(this).prop("Counter", 0).animate({
            Counter: target
        }, {
            duration: 3000,
            easing: "swing",
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    const updateQuoteSummary = () => {
        const selectedService = $("#serviceSelect").val();
        const quantity = Number($("#quantityInput").val()) || 1;
        const deliveryCost = Number($("#deliverySelect").val());
        const price = Number($("#serviceSelect option:selected").data("price"));
        const total = (price * quantity) + deliveryCost;
        const giftNote = $("#giftNote").val() || "-";

        $("#quoteTotal").text(new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(total));

        $("#quoteDetail").text(`${quantity}x ${selectedService}, pengiriman ${$("#deliverySelect option:selected").text()}, catatan hadiah: ${giftNote}`);
    };

    $("#quoteForm").on("submit", function (e) {
        e.preventDefault();
        updateQuoteSummary();
    });

    $("#serviceSelect, #quantityInput, #deliverySelect, #giftNote").on("input change", function () {
        updateQuoteSummary();
    });

    updateQuoteSummary();

    const $contactMessage = $("#contactMessage");

    const showContactMessage = (status, message) => {
        $contactMessage
            .removeClass("d-none alert-success alert-danger")
            .addClass(status === "error" ? "alert-danger" : "alert-success")
            .text(message);
    };

    const isValidEmail = (value) => {
        const atIndex = value.indexOf("@");
        const dotIndex = value.lastIndexOf(".");

        return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < value.length - 1;
    };

    $("#contactForm").submit(function (e) {
        e.preventDefault();

        const nama = $("#nama").val().trim();
        const email = $("#email").val().trim();
        const pesan = $("#pesan").val().trim();

        if (!nama || !email || !pesan) {
            showContactMessage("error", "Semua field harus diisi sebelum mengirim pesan.");
            return;
        }

        if (!isValidEmail(email)) {
            showContactMessage("error", "Format email tidak valid. Silakan periksa kembali.");
            return;
        }

        showContactMessage("success", `Terima kasih ${nama}! Pesan Anda telah diterima dan tim kami akan menghubungi kembali melalui email.`);
        $("#contactForm")[0].reset();
    });

});