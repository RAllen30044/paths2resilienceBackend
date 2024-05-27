import { faker } from "@faker-js/faker";
import { Donor, PrismaClient, User, Volunteer } from "@prisma/client";
import { encryptPassword } from "./validations";
const client = new PrismaClient();

const clearDb = async () => {
  await client.user.deleteMany();
  await client.volunteer.deleteMany();
  await client.donor.deleteMany();
};

const seedInfo = async () => {
  const greg = await client.user.create({
    data: {
      username: `greg.rashton`,
      password: await encryptPassword(`GoodDay89`),
      email: `greg.rashton@gmail.com`,
    },
  });
  const debbie = await client.user.create({
    data: {
      username: `debbie.rashton`,
      password: await encryptPassword(`YalanaGreg87`),
      email: `debbie.rashton@gmail.com`,
    },
  });
  const rob = await client.user.create({
    data: {
      username: `robharmony`,
      password: await encryptPassword(`Inhumane#001`),
      email: `robharmony@gmail.com`,
    },
  });

  const yalana = await client.user.create({
    data: {
      username: `yalana.rashton`,
      password: await encryptPassword(`AriNaya2223$`),

      email: `yalana.rashton@gmail.com`,
    },
  });
  const users: User[] = [greg, debbie, rob, yalana];

  users.forEach((user) => user);
  type personArray<T> = T[];
  const volunteers: personArray<Volunteer> = [];
  for (let i = 0; i < 40; i++) {
    const personType = faker.person.sexType();
    const firstName = faker.person.firstName(personType);
    const lastName = faker.person.lastName();
    const volunteer = await client.volunteer.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email({
          firstName: firstName,
          lastName: lastName,
        }),
        phoneNumber: faker.phone.number(),
      },
    });

    volunteers.push(volunteer);
  }
  const donors: personArray<Donor> = [];
  for (let i = 0; i < 100; i++) {
    const personType = faker.person.sexType();
    const firstName = faker.person.firstName(personType);
    const lastName = faker.person.lastName();
    const donor = await client.donor.create({
      data: {
        name: firstName + " " + lastName,
        email: faker.internet.email({
          firstName: firstName,
          lastName: lastName,
        }),
        amount: faker.number.int({ min: 1, max: 100000 }),
      },
    });

    donors.push(donor);
  }
};

Promise.resolve()
  .then(() => console.log("Clearing seed file"))
  .then(clearDb)
  .then(seedInfo)
  .then(() => console.log("Seeded"))
  .catch(console.error);
