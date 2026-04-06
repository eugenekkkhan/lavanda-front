import type { Service } from "./services.data";

export interface ServiceDetails {
  title: string;
  description: string;
  imageURL: string;
  items: Service[];
}

export const serviceDetailsData: Record<string, ServiceDetails> = {
  uzd: {
    title: "УЗИ-диагностика",
    description:
      "Ультразвуковые исследования позволяют быстро и безопасно оценить состояние внутренних органов, сосудов и суставов. Исследования проводятся на современном оборудовании с подробным заключением.",
    imageURL:
      "https://media.istockphoto.com/id/1295782888/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%BA%D0%B0%D0%B1%D0%B8%D0%BD%D0%B5%D1%82-%D0%B2%D1%80%D0%B0%D1%87%D0%B0.jpg?s=612x612&w=0&k=20&c=vDcpy2AZ2WbeOSpebSevKYssoUeBwOa_Ett6l1nb8Nk=",
    items: [
      { id: "1", title: "УЗИ брюшной полости", description: "от 2200 р." },
      { id: "2", title: "УЗИ щитовидной железы", description: "от 1800 р." },
      { id: "3", title: "УЗИ сосудов", description: "от 2600 р." },
    ],
  },
  physiotherapy: {
    title: "Физиопроцедуры",
    description:
      "Физиотерапия ускоряет восстановление после травм и заболеваний, снижает болевой синдром и улучшает подвижность без лишней медикаментозной нагрузки.",
    imageURL:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    items: [
      { id: "1", title: "Магнитотерапия", description: "от 900 р." },
      { id: "2", title: "Лазеротерапия", description: "от 1200 р." },
      { id: "3", title: "Ультразвуковая терапия", description: "от 1100 р." },
    ],
  },
  procedures: {
    title: "Процедурный кабинет",
    description:
      "В процедурном кабинете выполняются инъекции, инфузии и забор биоматериала с соблюдением стандартов безопасности и стерильности.",
    imageURL:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1400&q=80",
    items: [
      { id: "1", title: "Внутримышечная инъекция", description: "от 250 р." },
      { id: "2", title: "Внутривенное введение", description: "от 450 р." },
      { id: "3", title: "Забор крови", description: "от 300 р." },
    ],
  },
  gynecology: {
    title: "Гинекология",
    description:
      "Гинекологическое направление включает консультации, диагностику и лечебные процедуры для профилактики и лечения женских заболеваний.",
    imageURL:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
    items: [
      { id: "1", title: "Первичная консультация", description: "от 2200 р." },
      { id: "2", title: "Кольпоскопия", description: "от 1800 р." },
      { id: "3", title: "Установка/удаление ВМС", description: "от 2500 р." },
    ],
  },
  consultations: {
    title: "Консультации врачей",
    description:
      "Консультации профильных специалистов для взрослых и детей с персонализированным планом обследования, лечения и наблюдения.",
    imageURL:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80",
    items: [
      { id: "1", title: "Консультация терапевта", description: "от 1800 р." },
      { id: "2", title: "Консультация кардиолога", description: "от 2300 р." },
      { id: "3", title: "Консультация невролога", description: "от 2200 р." },
    ],
  },
};
