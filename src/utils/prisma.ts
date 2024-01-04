import { PrismaClient } from "@prisma/client";


// First we are creating a variable of type PrismaClient
let prisma: PrismaClient;


// So this declar global is used to declare something in a global scope
declare global {
    // here we are declearing var __prisma as a global variable
    var __prisma: PrismaClient | undefined;
}

// here we are checking if the global prisma variabel does have a value or not if not then we are assigning a new instance of prisma client
if(!global.__prisma) {
    global.__prisma = new PrismaClient();
}

// created an instance of Prisma client
// here we are passing the value of global prisma variable to the variable we declared above
prisma = global.__prisma;


export default prisma;