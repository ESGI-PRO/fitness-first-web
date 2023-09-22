import React, { useEffect, useState } from "react";
import { getRandomeUserImage } from "../constants/globals";
import { sub } from "date-fns";
import { fDateTime, fAddMonths, fAddYears } from "../utils/formatTime";
import { Link } from "react-router-dom";
import { useScrollTrigger } from "@mui/material";
import subscriptionAPI from "../services/api/subscription.service";

function UserVerticalCard(props) {
  const { user, subscription } = props;
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const getEndDate = (name) => {
    const date = new Date(subscription.currentPeriodStart);
    
    if (name === '' || name === null || name === undefined) {
        name = 'Monthly'
    }

    switch (name) {
      case "Monthly":
        return fDateTime(fAddMonths(date, 1));
      case "SixMonths":
        return fDateTime(fAddMonths(date, 6));
      case "Yearly":
        return fDateTime(fAddYears(date, 1));
      default:
        return fDateTime(fAddMonths(date, 1));
    }
  };

  const fetchInvoice = async () => {
    const invoice = await subscriptionAPI.getInvoices();
    console.log("🚀 ~ file: Invoice.js:25 ~ fetchInvoice ~ invoice:", invoice);

    setInvoice(...invoice);
  };

  if (user && subscription) {
    return (
      <div className="flex flex-row mt-4 mb-8">
        <div className="flex my-4  flex-col items-center mr-6">
          <img src={getRandomeUserImage()} className="h-32 w-32 rounded-full" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col w-full my-4">
            <p className="blackColor20Medium mb-2">
              {user?.userName[0].toUpperCase() + user?.userName.slice(1)}{" "}
            </p>
            <p className="blackColor14Medium">{user?.email}</p>
            {user?.trainerSpeciality && (
              <p className="primaryColor14SemiBold">
                {user?.trainerSpeciality}
                <span className="ml-2">TRAINER</span>
              </p>
            )}{" "}
          </div>

          <p className="mb-4 mt-2 primaryColor14SemiBold">Subscription</p>

          <p className="blackColor14Medium">
            <span className="mr-4 blackColor14SemiBold">Plan:</span>
            {subscription.plan?.slug}{" "}
          </p>
          <p className="blackColor14Medium  mt-2">
            <span className="mr-4 blackColor14SemiBold">Period Start:</span>
            {fDateTime(subscription.currentPeriodStart)}{" "}
          </p>
          <p className="blackColor14Medium  mt-2">
            <span className="mr-4 blackColor14SemiBold">Period End:</span>
            {getEndDate(subscription.plan?.name)}{" "}
          </p>

          <p className="blackColor14Medium mt-2">
            <span className="mr-4 blackColor14SemiBold">Price:</span>
            {subscription.plan?.price / 100} €{" "}
          </p>

          <p className="blackColor14Medium mt-2">
            <a
              href={invoice?.hostedInvoiceUrl}
              className="mr-4 blackColor14SemiBold"
            >
              Voir ma facture
            </a>
          </p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex my-4  w-full flex-col items-center">
      <img src={getRandomeUserImage()} className="h-32 w-32 rounded-full" />
      <div className="flex flex-col justify-center items-center w-full ml-4 my-4">
        <p className="blackColor20Medium mb-2">
          {user?.userName[0].toUpperCase() + user?.userName.slice(1)}{" "}
        </p>
        <p className="blackColor14Medium">{user?.email}</p>
        {user?.trainerSpeciality && (
          <p className="primaryColor14SemiBold">
            {user?.trainerSpeciality}
            TRAINER
          </p>
        )}{" "}
        <div class="flex items-center my-4 space-x-4">
          <Link
            to={"/dashboard/messenger"}
            type="button"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Envoyer un message à mon coach
          </Link>
          <Link
            to={"/dashboard/meeting"}
            type="button"
            class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Rejoindre en meeting
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}

export default UserVerticalCard;
