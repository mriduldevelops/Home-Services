const { gql, default: request } = require("graphql-request");

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_MASTER_URL_KEY +
  "/master";

const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        id
        name
        bgcolor {
          hex
        }
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getBussinessLists = async () => {
  const query = gql`
    query BussinessList {
      bussinessLists {
        id
        name
        contactPerson
        email
        about
        address
        images {
          url
        }
        category {
          name
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBussinessByCategory = async (category) => {
  const query =
    gql`
  query BussinessByCategory {
    bussinessLists(where: {category: {name: "` +
    category +
    `"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      images {
        url
      }
      name
    }
  }`;

  const result = await request(MASTER_URL, query);
  return result;
};

const getBussinessById = async (id) => {
  const query =
    gql`
  query BussinessById {
    bussinessList(where: {id: "` +
    id +
    `"})  {
      about
      address
      contactPerson
      email
      name
      id
      category {
        name
      }
      images {
        url
      }
    }
  }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const createBoooking = async (bussinessId, date, time, userEmail, userName) => {
  const mutationQuery =
    gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        bussinessList: {connect: {id: "` +
    bussinessId +
    `"}}, 
        date: "` +
    date +
    `", 
        time: "` +
    time +
    `", 
        userEmail: "` +
    userEmail +
    `", 
        userName: "` +
    userName +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const BussinessBookedSlot = async (bussinessId, date) => {
  const query =
    gql`
  query BussinessBookedSlot {
    bookings(where: {bussinessList: {id: "` +
    bussinessId +
    `"}, date: "` +
    date +
    `"}) {
      date
      time
    }
  }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getBookingHistory = async (userEmail) => {
  const query = gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "`+userEmail +`"}
    orderBy: publishedAt_DESC) {
      bussinessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
      id
    }
  }`;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getCategory,
  getBussinessLists,
  getBussinessByCategory,
  getBussinessById,
  createBoooking,
  BussinessBookedSlot,
  getBookingHistory,
};
