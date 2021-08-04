const { writeFileSync } = require("fs")

const fileName = "./mock.js"
const mockName = "ordersMock"
const numberOfFields = 1000
const orderTypeVariants = ["Payments", "Refund", "Deposit", "Payouts"]
const cryptoTypeValues = ["eur", "usdt", "ltc"]
const emailVariants = [
  "test-safecurrency@gmail.com",
  "test-volrix@gmail.com",
  "test-volrix2@gmail.com",
]
const currencyVariants = ["EUR", "USD", "RUB"]
const orderStatusVariants = ["cancel", "completed", "new"]
const paymentMethodVariants = ["mastercard", "paypal", "visa"]
const tooltipVariants = [
  "Canceled at 17 Nov, 2021 01:02 PM",
  "Approved at 18 Nov, 2019 01:02 AM",
  "Canceled at 1 Jan, 2017 03:14 PM",
  "Approved at 21 Aug, 2018 11:11 AM",
]

const randomValueGenerator = (data) =>
  data[Math.floor(Math.random() * data.length)]

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDateString = () => {
  const randomYear = getRandomIntInclusive(2015, 2021)
  let randomMonth = getRandomIntInclusive(1, 12)
  if (randomMonth < 10){randomMonth = `0${randomMonth}`}
  let randomDay = getRandomIntInclusive(1, 31)
  if (randomDay < 10){randomDay = `0${randomDay}`}
  return `${randomYear}-${randomMonth}-${randomDay}`
}

let resultMock = `const ${mockName} = [\n`

for (let i = 0; i < numberOfFields; i++) {
  resultMock =
    resultMock +
    `  {
    orderType: '${randomValueGenerator(orderTypeVariants)}',
    crypto: '${randomValueGenerator(cryptoTypeValues)}',
    ourId: '000${i}',
    orderID: '#M00${i}',
    email: '${randomValueGenerator(emailVariants)}',
    date: new Date('${getRandomDateString()}'),
    amount: '20.25',
    currency: '${randomValueGenerator(currencyVariants)}',
    orderStatus: '${randomValueGenerator(orderStatusVariants)}',
    paymentMethod: '${randomValueGenerator(paymentMethodVariants)}',
    tooltip: '${randomValueGenerator(tooltipVariants)}',
  },\n`
}

resultMock = resultMock + `] \n export default ${mockName}`

writeFileSync(fileName, resultMock, {})
