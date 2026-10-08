/* ZTL Check — rules
   This is the only file you edit to change the logic.
   Same shape as ztl-rules.json. One file per country / per niche later. */

window.ZTL_RULES = {
  timing: {
    discount_days: 5,      // pay within 5 days -> 30% off
    discount_pct: 30,
    appeal_days: 60,       // 60 days from notification to appeal
    late_notice_days: 360  // foreign plate: notification must arrive within 360 days
  },

  // 12 cells: how they entered x what does not match
  matrix: {
    "hotel|plate":      { o:"appeal_strong", g:"wrong_plate" },
    "hotel|datetime":   { o:"appeal_strong", g:"wrong_datetime" },
    "hotel|vehicle":    { o:"appeal_strong", g:"wrong_vehicle" },
    "hotel|none":       { o:"appeal_medium", g:"hotel_whitelist" },
    "no_sign|plate":    { o:"appeal_strong", g:"wrong_plate" },
    "no_sign|datetime": { o:"appeal_strong", g:"wrong_datetime" },
    "no_sign|vehicle":  { o:"appeal_strong", g:"wrong_vehicle" },
    "no_sign|none":     { o:"no_ground" },
    "knew|plate":       { o:"appeal_strong", g:"wrong_plate" },
    "knew|datetime":    { o:"appeal_strong", g:"wrong_datetime" },
    "knew|vehicle":     { o:"appeal_strong", g:"wrong_vehicle" },
    "knew|none":        { o:"no_ground" }
  },

  grounds: {
    wrong_plate:     "Wrong number plate. Bring the rental agreement showing the real plate.",
    wrong_datetime:  "Wrong date or time. Bring the rental agreement, or a boarding pass for that day.",
    wrong_vehicle:   "Wrong make or model. Bring the rental agreement and a photo of the car.",
    hotel_whitelist: "The hotel failed to register you. You need the email where you sent the plate and their reply. Without it, do not appeal.",
    notified_late:   "You were notified after the legal limit. This ground stands on its own."
  },

  outcomes: {
    not_a_fine: {
      s:"amber",
      h:"This is not the fine",
      d:"Your rental company charged you for handing your details to the police. The real fine arrives separately, by post, and can take months. Do not throw that envelope away.",
      c:"none", cl:"What happens next", href:"rental-charge.html"
    },
    preavviso: {
      s:"green",
      h:"Pay now and it ends here",
      d:"Paying at this stage avoids the cost of formal service. You cannot appeal yet, only once the official fine is issued. If you have a real ground, wait for the official fine.",
      c:"pay", cl:"How paying works", href:"how-to-pay.html"
    },
    appeal_strong: {
      s:"amber",
      h:"You have a ground",
      d:"The letter contains a factual error you can prove. This is the kind of appeal that works.",
      c:"act", cl:"Write my appeal — €9", href:"#"
    },
    appeal_medium: {
      s:"amber",
      h:"You have a ground, if you can prove it",
      d:"Hotel failures succeed in roughly a third of cases, but only with written evidence.",
      c:"act", cl:"Write my appeal — €9", href:"#"
    },
    no_ground: {
      s:"red",
      h:"Do not appeal",
      d:"There is no ground here. If an appeal to the Prefect fails the fine is doubled automatically, and you are only told once you are refused. Paying is the cheaper outcome.",
      c:"pay", cl:"How paying works", href:"how-to-pay.html"
    },
    pay_discount: {
      s:"green",
      h:"Pay today",
      d:"You are inside the discount window. Paying now costs 30% less than paying next week.",
      c:"pay", cl:"How paying works", href:"how-to-pay.html"
    },
    expired: {
      s:"red",
      h:"The appeal window has closed",
      d:"More than 60 days have passed since you were notified. There is nothing left to write. Pay before it is increased further.",
      c:"pay", cl:"How paying works", href:"how-to-pay.html"
    }
  }
};
