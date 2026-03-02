export interface DoctorListItem {
  id: string;
  title: string;
}

export interface DoctorsByCategory {
  title: string;
  description: string;
  doctors: DoctorListItem[];
}

export const doctorsByCategoryData: Record<string, DoctorsByCategory> = {
  therapists: {
    title: "Терапевты",
    description:
      "Специалисты по первичной диагностике и лечению, которые помогают определить причину симптомов и направляют к профильным врачам при необходимости.",
    doctors: [
      { id: "1", title: "Петров Петр Петрович" },
      { id: "2", title: "Владимиров Владимир Владимирович" },
      { id: "3", title: "Павлов Павел Павлович" },
    ],
  },
  physiotherapists: {
    title: "Физиотерапевты",
    description:
      "Специалисты по реабилитации и восстановительному лечению с применением современных физиотерапевтических методик.",
    doctors: [
      { id: "1", title: "Сидорова Анна Викторовна" },
      { id: "2", title: "Николаев Игорь Павлович" },
      { id: "3", title: "Кузнецова Мария Алексеевна" },
    ],
  },
  anyone_else: {
    title: "Другие специалисты",
    description:
      "Врачи и специалисты смежных направлений для комплексного ведения пациентов и междисциплинарного подхода.",
    doctors: [
      { id: "1", title: "Иванова Елена Сергеевна" },
      { id: "2", title: "Смирнов Олег Дмитриевич" },
      { id: "3", title: "Романова Юлия Игоревна" },
    ],
  },
};
