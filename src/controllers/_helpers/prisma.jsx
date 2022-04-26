import { PrismaClient } from '@prisma/client'

let prisma // eslint-disable-line
const options = {
  rejectOnNotFound: true
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options)
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options)
  }
  prisma = global.prisma
}

export default prisma
