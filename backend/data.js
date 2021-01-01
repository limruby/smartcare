import bcrypt from 'bcrypt'

const data = {
    users:[
        {
            name:'Yuzhi',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name:'John',
            email:'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },

    ],

    services: [
        {
            name:'Ms. Jenny',
            category:'Nurse',
            image:'/images/nurse1.png',
            price: 50,
            location: 'KL',
            schedule:[
                "Time: 10.00AM, Day: Monday, Date:27 December 2020",
                "Time: 11.00AM, Day: Monday, Date:27 December 2020",
                "Time: 12.00PM, Day: Monday, Date:27 December 2020",
                           
            ],
            rating: 3,
            numReviews: 10,
            description: 'Contact of PIC, name of PIC, pricing, location, staff, what service do we provide, visiting hour for family members'
        },
        {
            name:'Rumah Kesayangan',
            category:'Nursing Home',
            image:'/images/center1.png',
            price: 150,
            location: 'KL',
            schedule:[
                "Time: 10.00AM, Day: Tuesday, Date:28 December 2020",   
                "Time: 11.00AM, Day: Tuesday, Date:28 December 2020",             
            ],
            countInStock: 10,
            rating: 4.5,
            numReviews: 10,
            description: 'Contact of PIC, name of PIC, pricing, location, staff, what service do we provide, visiting hour for family members'
        },
        {
            name:'wheelchair',
            category:'Health Equipment',
            image:'/images/item1.png',
            price: 150,
            location: 'KL',
            schedule:[
                
            ],
            countInStock: 10,
            rating: 4.5,
            numReviews: 10,
            description: 'Second hand us'
        },
    ],
};

export default data;