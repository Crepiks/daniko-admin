import testWorkerImage from "@/assets/images/test-worker-image.png";

export default {
  imagePath: testWorkerImage,
  name: "Азат Кажимухан",
  job: "Педиатр",
  description:
    "Более 10 лет стажа, магистратура за границей и сотни успешных операций. Буду рад вас дечить!",
  schedule: {
    monday: "14.00:17.00",
    tuesday: "14.00:17.00",
    wednesday: "14.00:17.00",
    thursday: "14.00:17.00",
    friday: "14.00:17.00",
    saturday: "",
    sunday: "",
  },
  providedServices: [
    {
      id: 1,
      name: "Обследование",
    },
    {
      id: 4,
      name: "ЭКГ обследование",
    },
    {
      id: 6,
      name: "Рентген",
    },
    {
      id: 9,
      name: "Покрытие гипсом",
    },
  ],
};
