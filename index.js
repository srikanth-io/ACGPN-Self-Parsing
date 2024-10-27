import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Define the start and end dates
const startDate = moment("2023-08-12");
const endDate = moment("2024-06-24"); // New end date

// Define Indian holidays within the specified range
const indianHolidays = [
  "2023-08-15", // Independence Day
  "2023-10-02", // Gandhi Jayanti
  "2023-10-24", // Dussehra
  "2023-11-12", // Diwali
  "2023-12-25", // Christmas
  "2024-01-26", // Republic Day
  "2024-03-29", // Holi
  "2024-04-10", // Ram Navami
  "2024-05-01"  // Maharashtra Day
].map(date => moment(date).format("YYYY-MM-DD")); // Format dates for easier comparison

// Function to check if a date is a weekend or holiday
const isValidDate = (date) => {
  const day = date.day();
  const formattedDate = date.format("YYYY-MM-DD");
  // Exclude Saturdays (day 6), Sundays (day 0), and holidays
  return day !== 0 && day !== 6 && !indianHolidays.includes(formattedDate);
};

// Function to get a random date between startDate and endDate, excluding weekends and holidays
const getRandomValidDate = () => {
  let date;
  do {
    const daysDiff = endDate.diff(startDate, 'days');
    const randomOffset = random.int(0, daysDiff);
    date = moment(startDate).add(randomOffset, 'days');
  } while (!isValidDate(date));
  return date.format(); // Return formatted date
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const date = getRandomValidDate();

  const data = { date: date };
  console.log(date);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);
