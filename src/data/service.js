import testServiceImage from "@/assets/images/test-service-image.jpg";

export default {
  imagePath: testServiceImage,
  name: "Рентген",
  description:
    "Для проведения ренгена Daniko использует лучшую аппаратуру завезенную из-за границы",
  schedule: {
    monday: "14.00:17.00",
    tuesday: "14.00:17.00",
    wednesday: "14.00:17.00",
    thursday: "14.00:17.00",
    friday: "14.00:17.00",
    saturday: "",
    sunday: "",
  },
  providedWorkers: [
    {
      id: 1,
      name: "Кажимухан Азат",
      job: "Хирург",
    },
    {
      id: 4,
      name: "Кажимухан Азат",
      job: "Хирург",
    },
    {
      id: 6,
      name: "Кажимухан Азат",
      job: "Хирург",
    },
    {
      id: 9,
      name: "Кажимухан Азат",
      job: "Хирург",
    },
  ],
};
