const { createApp } = Vue;

const accordionLegal = createApp({
	data() {
		return {
			arrayAccordion: [
				{
					header: {
						title: "POLÍTICA DE PRIVACIDAD.",
						icon: "+",
					},
					content: `<p>1. INFORMACIÓN AL USUARIO</p>
                      <div>
                        <embed
                          src="../pdf/politicas de privacidad Fit21 Team Zone.pdf"
                          type="application/pdf"
                          width="610px"
                          height="210px"
                          />
                      </div>`,
					state: false,
				},
				{
					header: {
						title: "TERMINOS GENERALES Y CONDICIONES DE USO.",
						icon: "+",
					},
					content: `<div>
                        <embed
                          src="../pdf/terminos y condiciones de uso Fit21 Team Zone  Y APP Fit21 Team Zone.pdf"
                          type="application/pdf"
                          width="610px"
                          height="210px"
                          />
                      </div>`,
					state: false,
				},
				{
					header: {
						title: "TRABAJA CON NOSOTROS",
						icon: "+",
					},
					content: `<p>
                        En Fit21 Team Zone consideramos a las personas nuestro mayor activo y nuestra razón de ser, por ello el factor humano es un aspecto clave en nuestra organización.
                      </p>
                      <p>
                        Propiciamos su desarrollo, en un cordial ambiente de trabajo, con el objetivo de contar con personas formadas e involucradas en la empresa, que asuman los puestos de responsabilidad a medio y largo plazo, donde los objetivos de la empresa sean la suma de los objetivos de cada trabajador.
                      </p>
                      <p>
                        Si deseas asumir el reto de formar parte de Fit21 Team Zone, te invitamos a que contactes con nosotros
                      </p>`,
					state: false,
				},
			],
			arrayQuestions: [
        {
					header: {
						title: "¿Qué es Fit21, tu gimnasio online?",
						icon: "+",
					},
					content: `<p>
                      Es una herramienta web creada para aquellos que no tienen tiempo de ir al gimnasio y quieren seguir haciendo ejercicio. Se ofrecen clases de fitness para disfrutar en la comodidad del domicilo o en cualquier lugar con conexión a internet.
                    </p>`,
					state: false,
				},
        {
					header: {
						title: "¿He elegido el gimnasio que me conviene?",
						icon: "+",
					},
					content: `<p>
                      Los primeros días tal vez te plantees si el gym al que vas es el “bueno”. Para obtener la respuesta, sopesa los pros y contras que te ofrece tu gimnasio. ¿Te queda cerca de casa o del trabajo? ¿Permite horarios flexibles? ¿Un precio razonable? ¿Ofrece el tipo de entrenamiento o las clases que buscas?... Si a todo (o a casi todo) respondes que sí, has conseguido acertar en la elección de tu gimnasio.
                    </p>`,
					state: false,
				},
        {
					header: {
						title: "¿Entreno por mi cuenta o con un entrenador personal?",
						icon: "+",
					},
					content: `<p>
                      Depende de tu nivel físico y de los objetivos de la rutina de entrenamiento que elijas, pero, en las primeras sesiones, siempre es conveniente contar con el asesoramiento de un monitor que te oriente sobre las rutinas que más te convienen. Contar con un experto que te vigile y corrija tus errores a cada instante mejora tu rendimiento. También ayuda a que no flaquees y que ejerza casi de policía cuando, exhausta, exclames aquello de “no puedo más”. Pero deberás ser disciplinada con tu asistencia al gimnasio si quieres amortizar la inversión, dedicarle un presupuesto y ya verás, que al final, “sí puedes”.
                    </p>`,
					state: false,
				},
        {
					header: {
						title: "¿Debo ir cada día?",
						icon: "+",
					},
					content: `<p>
                      Puedes plantarte cada día en el gimnasio siempre que no trabajes los mismos grupos de músculos. Aún así, los expertos recomiendan desconectar un día. Por el bien de las articulaciones y el mental. Si tienes mono de deporte, mejor sal a pasear. Ir acompañada reduce el número de excusas para saltarte el entrenamiento.
                    </p>`,
					state: false,
				},
      ],
			menuClass: "menuHidden",
		};
	},
	methods: {
		showMenu() {
			this.menuClass = "menuShow";
		},
		closeMenu() {
			this.menuClass = "menuHidden";
		},
		changeStateLegal(index) {
			this.arrayAccordion[index].state =
				!this.arrayAccordion[index].state;
			this.arrayAccordion[index].header.icon = this.arrayAccordion[index]
				.state
				? "-"
				: "+";
		},
    changeStateQuestion(index) {
			this.arrayQuestions[index].state =
				!this.arrayQuestions[index].state;
			this.arrayQuestions[index].header.icon = this.arrayQuestions[index]
				.state
				? "-"
				: "+";
		},
	},
});

accordionLegal.mount("#app");

/*const accordion_item = document.querySelectorAll(".accordion_item");
style="background-color: #d3dde8"
accordion_item.forEach((item) => {
  const accordion_header_item = item.querySelector(".accordion_header");

  accordion_header_item.addEventListener("click", () => {
    const accordion_content_item = item.querySelector(".accordion_content");

    const item_actived = document.querySelector(".active");

    VerifyActive(item, accordion_content_item, item_actived);
  });
});

function VerifyActive(item, content, content_actived) {
  const icon_item = item.querySelector(".icon");
  const icon_item_active = document.querySelectorAll(".icon");

  icon_item_active.forEach((item) => (item.innerHTML = "+"));

  if (content_actived) {
    content_actived.style.height = 0;
    content_actived.classList.remove("active");
  }

  if (content !== content_actived) {
    icon_item.innerHTML = "-";
    content.classList.add("active");
    content.style.height = content.scrollHeight + 10 + "px";
  }
}
*/
