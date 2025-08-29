$(document).ready(function () {
    let slideCount = 1;

    // Generate timestamp ID
    function createTimestampId() {
        return Date.now().toString();
    }

    function updateSlideNumbers() {
        $("#slides-container .slide").each(function (index) {
            $(this)
                .find("p")
                .text(`Slide ${index + 1}`);
        });
        slideCount = $("#slides-container .slide").length;
    }

    // Add new slide
    $("#add-slide").on("click", function () {
        slideCount++;
        const newSlide = $(`
                <div class="col-12 slide mt-30">
                    <p>Slide ${slideCount}</p>
                    <div class="form-group">
                        <textarea name="message[]" placeholder="Mensaje" rows="4" required></textarea>
                    </div>
                    <div class="form-group mb-30">
                        <input type="file" name="image[]" accept="image/*">
                    </div>
                    <button type="button" class="remove-slide butn butn-bord radius-20 mt-10 p-3">Eliminar</button>
                </div>
            `);
        $("#slides-container").append(newSlide);
    });

    // Remove slide
    $(document).on("click", ".remove-slide", function () {
        $(this).closest(".slide").remove();
        updateSlideNumbers();
    });

    // Handle submit

    $("#slides-form").on("submit", function (e) {
        e.preventDefault();

        const carouselId = createTimestampId();
        const slides = [];

        // 👇 Get selected template_id from the dropdown
        const templateId = $("select[name='templates']").val();

        $("#slides-container .slide").each(function (index) {
            let cuerpo = "";
            const textarea = $(this).find("textarea");

            if (textarea.length > 0) {
                cuerpo = (textarea.val() || "").toString().trim();
            }

            const fileInput = $(this).find("input[type='file']")[0];
            let imagen = "";

            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                imagen = fileInput.files[0].name;
            }

            slides.push({
                slide_id: Date.now() + index,
                carousel_id: carouselId,
                orden: index + 1,
                cuerpo: cuerpo,
                imagen: imagen,
                imagen_diseñada: null,
            });
        });

        const payload = {
            carousel_id: carouselId,
            estado: "Idea",
            template_id: templateId, // 👈 dynamic instead of hardcoded
            slides: slides,
        };

        // POST to your n8n webhook
        $.ajax({
            url: "https://n8n.aliendevelopers.com/webhook/cablesmonperne/create-carousel",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            beforeSend: function () {
                $("#loader").show();
                $("#result").hide();
            },

            success: function (response) {
                console.log("✅ Sent successfully:", response);
                $("#loader").hide();

                if (Array.isArray(response) && response.length > 0) {
                    // Limpio el contenedor antes de agregar nuevas imágenes
                    $("#result").show();
                    $("#result").find(".images-wrapper").remove();

                    const wrapper = $("<div class='images-wrapper'></div>");

                    response.forEach((slide) => {
                        if (slide.imagen_diseñada) {
                            const img = $(`<img src="${slide.imagen_diseñada}" alt="Imagen diseñada"
                                            style="max-width:100%; border-radius:10px; margin:10px;">`);
                            wrapper.append(img);
                        }
                    });

                    $("#result").append(wrapper);
                } else {
                    alert("No se generaron imágenes.");
                }
            },

            error: function (xhr) {
                $("#loader").hide();
                console.error("❌ Error:", xhr.responseText);
                alert("Hubo un error al enviar el carousel.");
            },
        });

    });
});

/* [
  {
    "carousel_id": "1691234567890",
    "estado": "Idea",
    "template_id": 1,
    "slides": [
      {
        "slide_id": 1527,
        "carousel_id": 201,
        "orden": 1,
        "cuerpo": "Want to learn Spanish fast? Let's explore a fun phrase today!",
        "imagen": "",
        "imagen_diseñada": null
      },
      {
        "slide_id": 1528,
        "carousel_id": 201,
        "orden": 2,
        "cuerpo": "Want to learn Spanish fast? Let's explore a fun phrase today!",
        "imagen": "",
        "imagen_diseñada": null
      },
      {
        "slide_id": 1529,
        "carousel_id": 201,
        "orden": 3,
        "cuerpo": "Want to learn Spanish fast? Let's explore a fun phrase today!",
        "imagen": "",
        "imagen_diseñada": null
      },
      {
        "slide_id": 1530,
        "carousel_id": 201,
        "orden": 4,
        "cuerpo": "Want to learn Spanish fast? Let's explore a fun phrase today!",
        "imagen": "",
        "imagen_diseñada": null
      }
    ]
  }
]

CREATE SCHEMA contenido_cablesmonperne; */
