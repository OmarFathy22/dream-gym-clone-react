import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import {
  ExerciseCard,
  ExerciseName,
  ExercisesContainer,
  Target,
} from "../components/ThirdSection";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";

const CollectionName = "List of All Exercises"; ///////// 1
const ID = 'omar'
let NewArray = [];
// let AllExercises = [
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VNO6PzmA_bb0KN",
//     "id": "0001",
//     "name": "3/4 sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EJ=MFuwSNCVYt7",
//     "id": "0002",
//     "name": "45° side bend",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rKvoWNSyg9EFVS",
//     "id": "0003",
//     "name": "air bike",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uODblsLJ11l4Xf",
//     "id": "1512",
//     "name": "all fours squad stretch",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZXPNMvHoZAcTzL",
//     "id": "0006",
//     "name": "alternate heel touchers",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wO4pL6Lgk9Qod0",
//     "id": "0007",
//     "name": "alternate lateral pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AyHhlAj0zKsx+N",
//     "id": "1368",
//     "name": "ankle circles",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_pzGLF0sPT3-1m",
//     "id": "3293",
//     "name": "archer pull up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/R+Bks+rhgTJTa6",
//     "id": "3294",
//     "name": "archer push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7R+NuyOxjU1Zqe",
//     "id": "2355",
//     "name": "arm slingers hanging bent knee legs",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8i8ulXlignkq+K",
//     "id": "2333",
//     "name": "arm slingers hanging straight legs",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vBGqvUXB0bWJL9",
//     "id": "3214",
//     "name": "arms apart circular toe touch (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=ceEV5WKTZip_4",
//     "id": "3204",
//     "name": "arms overhead full sit-up (male)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B_=bkh0+SitdW1",
//     "id": "0009",
//     "name": "assisted chest dip (kneeling)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5pv=4gjssDFX5k",
//     "id": "0011",
//     "name": "assisted hanging knee raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x7iWmtvgZ5uaBS",
//     "id": "0010",
//     "name": "assisted hanging knee raise with throw down",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Zl9s1v_EfY9kVA",
//     "id": "1708",
//     "name": "assisted lying calves stretch",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uNChJH7zXsQd_a",
//     "id": "1709",
//     "name": "assisted lying glutes stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H3HqRXZ=Wz+SPl",
//     "id": "1710",
//     "name": "assisted lying gluteus and piriformis stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UyM0p_cB2VBiOq",
//     "id": "0012",
//     "name": "assisted lying leg raise with lateral throw down",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rn2kw4x6C0g3Q3",
//     "id": "0013",
//     "name": "assisted lying leg raise with throw down",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AXu-BP73fxIh8h",
//     "id": "0014",
//     "name": "assisted motion russian twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RZo=ertQ5VuT+Z",
//     "id": "0015",
//     "name": "assisted parallel close grip pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nYP+6uGV=hvEw2",
//     "id": "0016",
//     "name": "assisted prone hamstring",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/US7g00bv5CGilF",
//     "id": "1713",
//     "name": "assisted prone lying quads stretch",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p0_q502RfHxtc8",
//     "id": "1714",
//     "name": "assisted prone rectus femoris stretch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JccNkdiNOuxD+4",
//     "id": "0017",
//     "name": "assisted pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/W4ktyHaW=cpvKj",
//     "id": "1716",
//     "name": "assisted seated pectoralis major stretch with stability ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_0PR8D0mWn-kiq",
//     "id": "1712",
//     "name": "assisted side lying adductor stretch",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LVPu_oc-Npetly",
//     "id": "1758",
//     "name": "assisted sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/L+RvwqsF7i7Sc_",
//     "id": "1431",
//     "name": "assisted standing chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZN2GvrCcIb4U3Q",
//     "id": "1432",
//     "name": "assisted standing pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gXPy=8Gq7Uvk4n",
//     "id": "0018",
//     "name": "assisted standing triceps extension (with towel)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iDNXZ5EZeSwt4P",
//     "id": "0019",
//     "name": "assisted triceps dip (kneeling)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wL2pKkwhACB7-c",
//     "id": "2364",
//     "name": "assisted wide-grip chest dip (kneeling)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/By+2Trv9EUxj_2",
//     "id": "3220",
//     "name": "astride jumps (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Td6EqbG4WNh5EU",
//     "id": "3672",
//     "name": "back and forth step",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lDp=a-90yq56bH",
//     "id": "1314",
//     "name": "back extension on exercise ball",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XOVtr8YcJ6371w",
//     "id": "3297",
//     "name": "back lever",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2h7U1rKh2vDWRh",
//     "id": "1405",
//     "name": "back pec stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/m+XFH89H4psJL0",
//     "id": "1473",
//     "name": "backward jump",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-yGAxTjh5KB3gE",
//     "id": "0020",
//     "name": "balance board",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SdDzZKVm7YhSsD",
//     "id": "0968",
//     "name": "band alternating biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v3TS1404RzO7O7",
//     "id": "0969",
//     "name": "band alternating v-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+nd-ZuzsT9ZO-g",
//     "id": "0970",
//     "name": "band assisted pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B4jyL_xxmYKWx2",
//     "id": "0971",
//     "name": "band assisted wheel rollerout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MayMsWRKky0PXg",
//     "id": "1254",
//     "name": "band bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bkOTROw98rE-Dp",
//     "id": "0980",
//     "name": "band bent-over hip extension",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/N0A4EPesEP4mRV",
//     "id": "0972",
//     "name": "band bicycle crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pj11zv8A74O5xw",
//     "id": "0974",
//     "name": "band close-grip pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OumgkiLTpR6VIV",
//     "id": "0975",
//     "name": "band close-grip push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+iTsbdAT3LHD9n",
//     "id": "0976",
//     "name": "band concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XW=WpoQSthkK9x",
//     "id": "3117",
//     "name": "band fixed back close grip pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ItKfAX+b=pO-7Q",
//     "id": "3116",
//     "name": "band fixed back underhand pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PG7aDo4gCcBbOq",
//     "id": "0977",
//     "name": "band front lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cln3BjVniexlLE",
//     "id": "0978",
//     "name": "band front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/l8jGyWa+vdLAAy",
//     "id": "1408",
//     "name": "band hip lift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yW865tRbNNJrw+",
//     "id": "0979",
//     "name": "band horizontal pallof press",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/L8SH+enQKywm3+",
//     "id": "0981",
//     "name": "band jack knife sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RWG2Oh2mrVrCYe",
//     "id": "0983",
//     "name": "band kneeling one arm pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WUhZOznluluJf=",
//     "id": "0985",
//     "name": "band kneeling twisting crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/m8-yyzpotSSr_Q",
//     "id": "0984",
//     "name": "band lying hip internal rotation",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v-miUYhA3CZ+NB",
//     "id": "1002",
//     "name": "band lying straight leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SIyZEyCBUtZkFg",
//     "id": "0986",
//     "name": "band one arm overhead biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WZHletoNVCpdfq",
//     "id": "0987",
//     "name": "band one arm single leg split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BHMW-p_KEYqjYo",
//     "id": "0988",
//     "name": "band one arm standing low row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/utXOUUeg0UMDpq",
//     "id": "0989",
//     "name": "band one arm twisting chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZIukicdca3t3UZ",
//     "id": "0990",
//     "name": "band one arm twisting seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8xjbMoYyB-xmD9",
//     "id": "0991",
//     "name": "band pull through",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/11nMM_V4Qf-1rT",
//     "id": "0992",
//     "name": "band push sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/m4fmLQG72rH_77",
//     "id": "0993",
//     "name": "band reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ye54k9pkxbKCgA",
//     "id": "0994",
//     "name": "band reverse wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IF_Sh6qVEAris5",
//     "id": "0996",
//     "name": "band seated hip internal rotation",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NPoSzT-LlZGctg",
//     "id": "1011",
//     "name": "band seated twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9iTA=Za4rkivD5",
//     "id": "0997",
//     "name": "band shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/S-Ug=89dwQ34Yp",
//     "id": "1018",
//     "name": "band shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jQf4ikjz+DXY-O",
//     "id": "0998",
//     "name": "band side triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/URSncK96frMP0I",
//     "id": "0999",
//     "name": "band single leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_czs2Nkbd_CZPs",
//     "id": "1000",
//     "name": "band single leg reverse calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ggHDGtWPsg55_i",
//     "id": "1001",
//     "name": "band single leg split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+J2i-_Dgpo=+L9",
//     "id": "1004",
//     "name": "band squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1pnh9LS-whLKbP",
//     "id": "1003",
//     "name": "band squat row",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/G+nTZlCa3fyO9X",
//     "id": "1005",
//     "name": "band standing crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lQ4-Ycu5YWY-_V",
//     "id": "1022",
//     "name": "band standing rear delt row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UShtsqOKZkDPVC",
//     "id": "1007",
//     "name": "band standing twisting crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6O7I=EDY2GSV8x",
//     "id": "1008",
//     "name": "band step-up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/J5apRS7++1+v9u",
//     "id": "1009",
//     "name": "band stiff leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H18iwDoqEeF2oq",
//     "id": "1023",
//     "name": "band straight back stiff leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/N60N7fxc6xyiRi",
//     "id": "1010",
//     "name": "band straight leg deadlift",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D6Y+g=90em=Xp1",
//     "id": "1012",
//     "name": "band twisting overhead press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EpueneSKXTr2=F",
//     "id": "1369",
//     "name": "band two legs calf raise - (band under both legs) v. 2",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PqYj=HYu7_wl6Z",
//     "id": "1013",
//     "name": "band underhand pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y77Sabm9RoU1Aq",
//     "id": "1014",
//     "name": "band v-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HsQHsDscwF4G9z",
//     "id": "1015",
//     "name": "band vertical pallof press",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hnvzgsJzDIkVBj",
//     "id": "1016",
//     "name": "band wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-ZzAOpbikZF+4Y",
//     "id": "1017",
//     "name": "band y-raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9UVQNwJ5Xurv8J",
//     "id": "0023",
//     "name": "barbell alternate biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1Bkwihmik2VDR2",
//     "id": "0024",
//     "name": "barbell bench front squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aHx++-+OJ-urWp",
//     "id": "0025",
//     "name": "barbell bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yD5gEFfHhigtQy",
//     "id": "0026",
//     "name": "barbell bench squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/C0W2qtu5pqXOQW",
//     "id": "1316",
//     "name": "barbell bent arm pullover",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7QGK2sJ7YU9yWO",
//     "id": "0027",
//     "name": "barbell bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8fZ=KUNKZORiHD",
//     "id": "2407",
//     "name": "barbell biceps curl (with arm blaster)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/f+WSrCiIhsqQLl",
//     "id": "0028",
//     "name": "barbell clean and press",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YXN76_MgWvBgFJ",
//     "id": "0029",
//     "name": "barbell clean-grip front squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8BeSHRviguBX7D",
//     "id": "0030",
//     "name": "barbell close-grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Da0ct1OIMN0Vmu",
//     "id": "0031",
//     "name": "barbell curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6P_W8tSIf72izD",
//     "id": "0032",
//     "name": "barbell deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-FiUzkyMihgJ5w",
//     "id": "0033",
//     "name": "barbell decline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GoN84Bf5952DFx",
//     "id": "0034",
//     "name": "barbell decline bent arm pullover",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pjhEV85kHz6Gpw",
//     "id": "0035",
//     "name": "barbell decline close grip to skull press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zTBDjh13qMRgYu",
//     "id": "1255",
//     "name": "barbell decline pullover",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rLnhSWXQOOsqpi",
//     "id": "0036",
//     "name": "barbell decline wide-grip press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YZN-fy4iwjzpey",
//     "id": "0037",
//     "name": "barbell decline wide-grip pullover",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BtU5Ewywo0M1Y7",
//     "id": "0038",
//     "name": "barbell drag curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/i05aE4LTCQ6uMD",
//     "id": "1370",
//     "name": "barbell floor calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OMhgjNvdd3pdPO",
//     "id": "0039",
//     "name": "barbell front chest squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T-BPgTiGg3bz0x",
//     "id": "0041",
//     "name": "barbell front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zDJ_q6_0sFaflU",
//     "id": "0040",
//     "name": "barbell front raise and pullover",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-mbfTaYUALPk8i",
//     "id": "0042",
//     "name": "barbell front squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0H=qSv9UelQtj4",
//     "id": "0043",
//     "name": "barbell full squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_KL-pjxhYVYFk1",
//     "id": "1461",
//     "name": "barbell full squat (back pov)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VKRX61sIsa1IJI",
//     "id": "1462",
//     "name": "barbell full squat (side pov)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QKhztyHO_RyhRI",
//     "id": "1545",
//     "name": "barbell full zercher squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/y8u86sewx4FVN1",
//     "id": "1409",
//     "name": "barbell glute bridge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dWa1lkS6mG2Rdm",
//     "id": "3562",
//     "name": "barbell glute bridge two legs on bench (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LLvhlo37BQvG+v",
//     "id": "0044",
//     "name": "barbell good morning",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RpdBD9sdbS3j0S",
//     "id": "0045",
//     "name": "barbell guillotine bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ynVid3o-d7laRt",
//     "id": "0046",
//     "name": "barbell hack squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KP6YHItZAvWwcW",
//     "id": "1436",
//     "name": "barbell high bar squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4THWKHnoEUCe9L",
//     "id": "0047",
//     "name": "barbell incline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3f-qZYSQqbKzL+",
//     "id": "1719",
//     "name": "barbell incline close grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lAShb0Qt0NWS0u",
//     "id": "0048",
//     "name": "barbell incline reverse-grip press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ocyInDIZlObXOx",
//     "id": "0049",
//     "name": "barbell incline row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Dss=gntUisDBfD",
//     "id": "0050",
//     "name": "barbell incline shoulder raise",
//     "target": "serratus anterior"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ytjoCSPb_HCi4Z",
//     "id": "0051",
//     "name": "barbell jefferson squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lEg-6ja-vUDumK",
//     "id": "0052",
//     "name": "barbell jm bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3x-8Dy=y2D4nj=",
//     "id": "0053",
//     "name": "barbell jump squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jdpF-3zvpgrm9J",
//     "id": "1410",
//     "name": "barbell lateral lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/X+uaZGCBUUD_8P",
//     "id": "1435",
//     "name": "barbell low bar squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-AVtSbR5tBE5ec",
//     "id": "0054",
//     "name": "barbell lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZP5CpJcY9y=474",
//     "id": "1720",
//     "name": "barbell lying back of the head tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jVkI+lGyN+GXI5",
//     "id": "0055",
//     "name": "barbell lying close-grip press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AkM0L_CDfdw+Br",
//     "id": "0056",
//     "name": "barbell lying close-grip triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xml9FHS7jYnTjt",
//     "id": "0057",
//     "name": "barbell lying extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bT6p8eIYCMl1tC",
//     "id": "0058",
//     "name": "barbell lying lifting (on hip)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WoDl6O=8pW63QH",
//     "id": "0059",
//     "name": "barbell lying preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aFsWFOdXyNr7S+",
//     "id": "0061",
//     "name": "barbell lying triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D-WC1PxK4F0+Wz",
//     "id": "0060",
//     "name": "barbell lying triceps extension skull crusher",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jX8khSJyb=IoV7",
//     "id": "0063",
//     "name": "barbell narrow stance squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1dvpbkj5JCaV4d",
//     "id": "0064",
//     "name": "barbell one arm bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1FOY0dM+TEJ7iW",
//     "id": "0065",
//     "name": "barbell one arm floor press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-9QkMD_A75Wpvc",
//     "id": "0066",
//     "name": "barbell one arm side deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/l981tHe+TiU=hT",
//     "id": "0067",
//     "name": "barbell one arm snatch",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CMjr22W1T6ayBs",
//     "id": "0068",
//     "name": "barbell one leg squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Mx9Y-b5x5dCaz6",
//     "id": "0069",
//     "name": "barbell overhead squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Kzwh=p-XZoIpMy",
//     "id": "1411",
//     "name": "barbell palms down wrist curl over a bench",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6oHBfzUE9hV0zr",
//     "id": "1412",
//     "name": "barbell palms up wrist curl over a bench",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/voGZEv8CfCVpHP",
//     "id": "3017",
//     "name": "barbell pendlay row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ANkuLCphTTovD0",
//     "id": "1751",
//     "name": "barbell pin presses",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uFZaBDeu09iCI5",
//     "id": "0070",
//     "name": "barbell preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hdocvlbPbJJFdM",
//     "id": "0071",
//     "name": "barbell press sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TgkorpeYOUsdUR",
//     "id": "0072",
//     "name": "barbell prone incline curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7il3Nl+8I-ZB5x",
//     "id": "0073",
//     "name": "barbell pullover",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gptu5sYRDdBO30",
//     "id": "0022",
//     "name": "barbell pullover to press",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cMbfiYGzPNtCWt",
//     "id": "0074",
//     "name": "barbell rack pull",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ua007IQPuElL5L",
//     "id": "0075",
//     "name": "barbell rear delt raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/67UZGBtzfL8TMz",
//     "id": "0076",
//     "name": "barbell rear delt row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qmbAmSJNhpev0W",
//     "id": "0078",
//     "name": "barbell rear lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gmErfWgL+=IKGP",
//     "id": "0077",
//     "name": "barbell rear lunge v. 2",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PNUrEX7iXT7l=o",
//     "id": "0079",
//     "name": "barbell revers wrist curl v. 2",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JQ_3LfjgXwW8c8",
//     "id": "2187",
//     "name": "barbell reverse close-grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bFFadcjf-54x3T",
//     "id": "0080",
//     "name": "barbell reverse curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PETsQXDwnGr1V8",
//     "id": "0118",
//     "name": "barbell reverse grip bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_iYkL1wMj6OmQL",
//     "id": "1256",
//     "name": "barbell reverse grip decline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/udnYAuhrFVnxaE",
//     "id": "1257",
//     "name": "barbell reverse grip incline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1BvaEKpDtUhKFY",
//     "id": "1317",
//     "name": "barbell reverse grip incline bench row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fz1v2nlx3Qp0_n",
//     "id": "1721",
//     "name": "barbell reverse grip skullcrusher",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ptZhRnDVM-9cfM",
//     "id": "0081",
//     "name": "barbell reverse preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YNExV4UeBgbpJt",
//     "id": "0082",
//     "name": "barbell reverse wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XN0pxk3NROtFZQ",
//     "id": "0084",
//     "name": "barbell rollerout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oG=VFCfNvOMf2H",
//     "id": "0083",
//     "name": "barbell rollerout from bench",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GBZnBkMLDCXzg2",
//     "id": "0085",
//     "name": "barbell romanian deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/icA-4Vd2p6=i1h",
//     "id": "0086",
//     "name": "barbell seated behind head military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tLJXs7-GwJ3xGq",
//     "id": "0087",
//     "name": "barbell seated bradford rocky press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3xqnlDxrOB0PCA",
//     "id": "0088",
//     "name": "barbell seated calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xYXKFVvbYDy3nm",
//     "id": "1371",
//     "name": "barbell seated calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DPbdk__z-qzq1j",
//     "id": "1718",
//     "name": "barbell seated close grip behind neck triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/We_09LI08eiT1V",
//     "id": "0089",
//     "name": "barbell seated close-grip concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1apmWuh+7EgVo3",
//     "id": "0090",
//     "name": "barbell seated good morning",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3MI13VCPwhEWQu",
//     "id": "0091",
//     "name": "barbell seated overhead press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cib3bKW_c8gO78",
//     "id": "0092",
//     "name": "barbell seated overhead triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ViKrDu9lWen97o",
//     "id": "0094",
//     "name": "barbell seated twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jS71DfR9g7Qcuo",
//     "id": "0095",
//     "name": "barbell shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oXz8nx7gsr4CP9",
//     "id": "0096",
//     "name": "barbell side bent v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ImjsiE_xCJqgZA",
//     "id": "0098",
//     "name": "barbell side split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jOqI34UEfPkXg9",
//     "id": "0097",
//     "name": "barbell side split squat v. 2",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rt+poW8W94xpeD",
//     "id": "1756",
//     "name": "barbell single leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4okpZzj3xpohD0",
//     "id": "0099",
//     "name": "barbell single leg split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pcDGsma55C7nRz",
//     "id": "2799",
//     "name": "barbell sitted alternate leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p-oBSUmIpn3y3G",
//     "id": "2800",
//     "name": "barbell sitted alternate leg raise (female)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z04ywPeacz98=i",
//     "id": "0100",
//     "name": "barbell skier",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vmlB0_wF+BIA-6",
//     "id": "0101",
//     "name": "barbell speed squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QFv0+-nkpOYlae",
//     "id": "2810",
//     "name": "barbell split squat v. 2",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8-jv+vlPM++r2s",
//     "id": "0102",
//     "name": "barbell squat (on knees)",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vKa6k0vjHmdG2g",
//     "id": "2798",
//     "name": "barbell squat jump step rear lunge",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/we0mMtc253agJ6",
//     "id": "0103",
//     "name": "barbell standing ab rollerout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xQ2_=UxGXeEm=0",
//     "id": "0104",
//     "name": "barbell standing back wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/j9WgsK_Yt_IGtg",
//     "id": "0105",
//     "name": "barbell standing bradford press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mfNfh3Bp7cx=Bb",
//     "id": "1372",
//     "name": "barbell standing calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iEX6ff65GVeiVy",
//     "id": "0106",
//     "name": "barbell standing close grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DHD57_3eP3NXu5",
//     "id": "1456",
//     "name": "barbell standing close grip military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xi2UlhhonDoQ=w",
//     "id": "2414",
//     "name": "barbell standing concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3s_Pw+DeL+inQq",
//     "id": "0107",
//     "name": "barbell standing front raise over head",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Uz-lPOXlARE-wR",
//     "id": "0108",
//     "name": "barbell standing leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/31Tptb3h27=Gtg",
//     "id": "0109",
//     "name": "barbell standing overhead triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/J+NdSuSejSY7-z",
//     "id": "0110",
//     "name": "barbell standing reverse grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9oKReeto_STqDv",
//     "id": "0111",
//     "name": "barbell standing rocking leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9ePmUnkayE=z-I",
//     "id": "0112",
//     "name": "barbell standing twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3TWmxJOgqac2U-",
//     "id": "1629",
//     "name": "barbell standing wide grip biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3NQ3js0qFh4M9Y",
//     "id": "1457",
//     "name": "barbell standing wide military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+GSDY0jyPGqaHt",
//     "id": "0113",
//     "name": "barbell standing wide-grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6tWF360qIJLW1o",
//     "id": "0114",
//     "name": "barbell step-up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/87qqhKaUbozni-",
//     "id": "0115",
//     "name": "barbell stiff leg good morning",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/47rCyX5hJJumhU",
//     "id": "0116",
//     "name": "barbell straight leg deadlift",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AQus5gJsY8kNMb",
//     "id": "0117",
//     "name": "barbell sumo deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V3vSYzjHlSVafC",
//     "id": "3305",
//     "name": "barbell thruster",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qCU5VoTqtWMeN4",
//     "id": "0120",
//     "name": "barbell upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y6k=-xQUANvot=",
//     "id": "0119",
//     "name": "barbell upright row v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fImOtmCjXfcdA-",
//     "id": "0121",
//     "name": "barbell upright row v. 3",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z9qAXHT1YlZWx0",
//     "id": "0122",
//     "name": "barbell wide bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SuWHUzi8-jkFNy",
//     "id": "1258",
//     "name": "barbell wide reverse grip bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/G484M3GIHR2Bsw",
//     "id": "0124",
//     "name": "barbell wide squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/osDKY=7+PeZsRr",
//     "id": "0123",
//     "name": "barbell wide-grip upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1yf4jD_1vSSKbx",
//     "id": "0126",
//     "name": "barbell wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4rRaVIF1AKtxcg",
//     "id": "0125",
//     "name": "barbell wrist curl v. 2",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/R-7VZd_FTWf2Bc",
//     "id": "0127",
//     "name": "barbell zercher squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9ZOZk=9iC38biQ",
//     "id": "3212",
//     "name": "basic toe touch (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hMcA7B09=+zol3",
//     "id": "0128",
//     "name": "battling ropes",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8fJx8CcxSSuo1u",
//     "id": "3360",
//     "name": "bear crawl",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "assisted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZncDPHjDml5fqG",
//     "id": "1259",
//     "name": "behind head chest stretch",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zVdN9GWcSegsO4",
//     "id": "0129",
//     "name": "bench dip (knees bent)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PWj_8hxE_p3oEr",
//     "id": "1399",
//     "name": "bench dip on floor",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/orzQS0up+qtQ3Z",
//     "id": "0130",
//     "name": "bench hip extension",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fjy8zBqnO__bpm",
//     "id": "3019",
//     "name": "bench pull-ups",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rFSpRZBj5tkVw-",
//     "id": "3639",
//     "name": "bent knee lying twist (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qJnhQ3+B+ksNDj",
//     "id": "1770",
//     "name": "biceps leg concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4+OnnOrjiECmZo",
//     "id": "0139",
//     "name": "biceps narrow pull-ups",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ubmvj89x_oaden",
//     "id": "0140",
//     "name": "biceps pull-up",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ry3EJUlszcWAc5",
//     "id": "0137",
//     "name": "body-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1EqcFiKLExbpPb",
//     "id": "3543",
//     "name": "bodyweight drop jump squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/n=RlWAvUz_tGQr",
//     "id": "3544",
//     "name": "bodyweight incline side plank",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/o_RnQNx07O08oD",
//     "id": "1771",
//     "name": "bodyweight kneeling triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sSVY5UdEsy+l6g",
//     "id": "1769",
//     "name": "bodyweight side lying biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UuWB-HmcnLPvxg",
//     "id": "3168",
//     "name": "bodyweight squatting row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HUE--usvKQR7jG",
//     "id": "3167",
//     "name": "bodyweight squatting row (with towel)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EC4+shYLCILdBW",
//     "id": "1373",
//     "name": "bodyweight standing calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_KcPg2mvg-yPSE",
//     "id": "3156",
//     "name": "bodyweight standing close-grip one arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_OGCeo5LJNjBDm",
//     "id": "3158",
//     "name": "bodyweight standing close-grip row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+n00r92CbC2mZg",
//     "id": "3162",
//     "name": "bodyweight standing one arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/i1clZJj6dhqU3d",
//     "id": "3161",
//     "name": "bodyweight standing one arm row (with towel)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/71ofLLHh8rTrxe",
//     "id": "3166",
//     "name": "bodyweight standing row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gT4+ZSBD7Gcbsm",
//     "id": "3165",
//     "name": "bodyweight standing row (with towel)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DoxFm+dOHkj3ce",
//     "id": "0138",
//     "name": "bottoms-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5+kzUDWLXhxRhi",
//     "id": "1374",
//     "name": "box jump down with one leg stabilization",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FnYGe+bxavkGyG",
//     "id": "2466",
//     "name": "bridge - mountain climber (cross body)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9Msdl63igzSx3k",
//     "id": "1160",
//     "name": "burpee",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/76Pg_zTi=8M+WB",
//     "id": "0870",
//     "name": "butt-ups",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qraTBKs_dmhMoE",
//     "id": "1494",
//     "name": "butterfly yoga pose",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PftQv+2DuezdrI",
//     "id": "0148",
//     "name": "cable alternate shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EUgn-SJaqImzYz",
//     "id": "0149",
//     "name": "cable alternate triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nxpX-38mu+U7lS",
//     "id": "3235",
//     "name": "cable assisted inverse leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ndxUTrmertmd=t",
//     "id": "0150",
//     "name": "cable bar lateral pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=v77LoCpAx8y2U",
//     "id": "0151",
//     "name": "cable bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fAM=xeUkFXkJlZ",
//     "id": "1630",
//     "name": "cable close grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RL9Bz1gyKEoPVy",
//     "id": "1631",
//     "name": "cable concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lkoUT_FQZg80K2",
//     "id": "0152",
//     "name": "cable concentration extension (on knee)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=oFEQwIb9sAYU2",
//     "id": "0153",
//     "name": "cable cross-over lateral pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/t9YV8KnbjD2D_s",
//     "id": "0154",
//     "name": "cable cross-over revers fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_u7Bt9x2+53t5a",
//     "id": "0155",
//     "name": "cable cross-over variation",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/F=AjC6=fq2CQTS",
//     "id": "0868",
//     "name": "cable curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vSc5KG3z7JVSK_",
//     "id": "0157",
//     "name": "cable deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ib0=-UoSmiGivi",
//     "id": "0158",
//     "name": "cable decline fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aSdSEtE2Su4QoW",
//     "id": "1260",
//     "name": "cable decline one arm press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EFQ5xsDf22FC7=",
//     "id": "1261",
//     "name": "cable decline press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BwFPcCbc8tyWy4",
//     "id": "0159",
//     "name": "cable decline seated wide-grip row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ims-+q4SsNWijw",
//     "id": "1632",
//     "name": "cable drag curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fRdKHdRn5q283=",
//     "id": "0160",
//     "name": "cable floor seated wide-grip row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tSflhcGryLWkrL",
//     "id": "0161",
//     "name": "cable forward raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oAru=sMEvRL5iN",
//     "id": "0162",
//     "name": "cable front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mYMj5PPNvJTMgr",
//     "id": "0164",
//     "name": "cable front shoulder raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qy0e+D0Xq1ixQ+",
//     "id": "0165",
//     "name": "cable hammer curl (with rope)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RMCW2hQE28UNlf",
//     "id": "1722",
//     "name": "cable high pulley overhead tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mYizNadDY8Gi4-",
//     "id": "0167",
//     "name": "cable high row (kneeling)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GPUH4q+kLXWRoS",
//     "id": "0168",
//     "name": "cable hip adduction",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4mO7toYc+auCcq",
//     "id": "0169",
//     "name": "cable incline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JVR74f2JfmEI4_",
//     "id": "1318",
//     "name": "cable incline bench row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rScdEsWIWuSEWV",
//     "id": "0171",
//     "name": "cable incline fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZlCHzaGJ3OYJpt",
//     "id": "0170",
//     "name": "cable incline fly (on stability ball)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CjuUL-TocNP_fd",
//     "id": "0172",
//     "name": "cable incline pushdown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7624kwV1kLG8Qi",
//     "id": "0173",
//     "name": "cable incline triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xAdM-m1cmDj0ED",
//     "id": "0174",
//     "name": "cable judo flip",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rN-DNcSJkgzb3s",
//     "id": "0860",
//     "name": "cable kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D7O+Oj9ghav-o=",
//     "id": "0175",
//     "name": "cable kneeling crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/u0N+QPpH5tSCeI",
//     "id": "3697",
//     "name": "cable kneeling rear delt row (with rope) (male)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uE4y=EK53ftftP",
//     "id": "0176",
//     "name": "cable kneeling triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1SDZSReBVEpC7Z",
//     "id": "2330",
//     "name": "cable lat pulldown full range of motion",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=vvx9pa-gCRcUC",
//     "id": "0177",
//     "name": "cable lateral pulldown (with rope attachment)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zfGRNunZQ5X1CL",
//     "id": "2616",
//     "name": "cable lateral pulldown with v-bar",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/n6axUXOqJl2Jxn",
//     "id": "0178",
//     "name": "cable lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6KCIN1enG=UX=S",
//     "id": "0179",
//     "name": "cable low fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uBvAnqYL97tmH=",
//     "id": "0180",
//     "name": "cable low seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/C1XHxP7MJBjFqH",
//     "id": "1634",
//     "name": "cable lying bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Fla7PJ-uoOzkBC",
//     "id": "0182",
//     "name": "cable lying close-grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nQopj-DdovmRvi",
//     "id": "0184",
//     "name": "cable lying extension pullover (with rope attachment)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T=t6R+jvbG=ktI",
//     "id": "0185",
//     "name": "cable lying fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cf-c0RUxF=n_pn",
//     "id": "0186",
//     "name": "cable lying triceps extension v. 2",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UsFQChliQfZ5Rk",
//     "id": "0188",
//     "name": "cable middle fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/olHD16E18znXpI",
//     "id": "0189",
//     "name": "cable one arm bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/X80W+00pTwuu5o",
//     "id": "0190",
//     "name": "cable one arm curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TAEPm+wz1GxVXc",
//     "id": "1262",
//     "name": "cable one arm decline chest fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DoCB=70CVlYKyN",
//     "id": "1263",
//     "name": "cable one arm fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/G6pT6cD8QY10Z+",
//     "id": "1264",
//     "name": "cable one arm incline fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mxyFx3BaAYIlYE",
//     "id": "1265",
//     "name": "cable one arm incline press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PCn7b_hFp9pDiN",
//     "id": "1266",
//     "name": "cable one arm incline press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/c3ATA0yHFgAS0T",
//     "id": "0191",
//     "name": "cable one arm lateral bent-over",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xr1pS9RPhfJ9Qm",
//     "id": "0192",
//     "name": "cable one arm lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/l4vRWUoKndXp=5",
//     "id": "1633",
//     "name": "cable one arm preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6Ru-G1ZDJNQoQi",
//     "id": "1267",
//     "name": "cable one arm press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-33YjegottDJBC",
//     "id": "3563",
//     "name": "cable one arm pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yazRisFlYwL9=Q",
//     "id": "1635",
//     "name": "cable one arm reverse preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rnJKdiVet1+_26",
//     "id": "0193",
//     "name": "cable one arm straight back high row (kneeling)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hHOH-bNFQ1wURy",
//     "id": "1723",
//     "name": "cable one arm tricep pushdown",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jEv68T42X3QWlv",
//     "id": "1636",
//     "name": "cable overhead curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/j31b=HBlBT3dDS",
//     "id": "1637",
//     "name": "cable overhead curl on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yvAqCw=fJg1eec",
//     "id": "0194",
//     "name": "cable overhead triceps extension (rope attachment)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cx1xb3LW9t5zTb",
//     "id": "1319",
//     "name": "cable palm rotational row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dysrGHygONExZD",
//     "id": "0195",
//     "name": "cable preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Iv1myoAHiUri4m",
//     "id": "1268",
//     "name": "cable press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iQPa1vUeo8k2L8",
//     "id": "0196",
//     "name": "cable pull through (with rope)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x1SjQ8LB-esQDE",
//     "id": "0198",
//     "name": "cable pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZWdSl-Oz8JHwOh",
//     "id": "0197",
//     "name": "cable pulldown (pro lat bar)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A-wgjum=tC6xja",
//     "id": "1638",
//     "name": "cable pulldown bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TKrTPrnq2tOw3K",
//     "id": "0201",
//     "name": "cable pushdown",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ANzHZ6LiWOijsl",
//     "id": "0199",
//     "name": "cable pushdown (straight arm) v. 2",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CXqtEqDeseSEbh",
//     "id": "0200",
//     "name": "cable pushdown (with rope attachment)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EyeS2X42A98j9N",
//     "id": "0202",
//     "name": "cable rear delt row (stirrups)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6i2w0_Y+pDu209",
//     "id": "0203",
//     "name": "cable rear delt row (with rope)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tdLPOcNJtOgwgz",
//     "id": "0204",
//     "name": "cable rear drive",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FG8-T7Wfyt4WzO",
//     "id": "0205",
//     "name": "cable rear pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fyjnZnXMQce63d",
//     "id": "0873",
//     "name": "cable reverse crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1-18c7fqfJGI59",
//     "id": "0206",
//     "name": "cable reverse curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/44IeByTcrfggSJ",
//     "id": "2406",
//     "name": "cable reverse grip triceps pushdown (sz-bar) (with arm blaster)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aFDKNqgAD=Ea-p",
//     "id": "1413",
//     "name": "cable reverse one arm curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ds35vItjJqBxhh",
//     "id": "0209",
//     "name": "cable reverse preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T4dfbGyPvxJXRD",
//     "id": "0210",
//     "name": "cable reverse wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QkEyYI=EzhP9wz",
//     "id": "0207",
//     "name": "cable reverse-grip pushdown",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/unbGpYqh5Ggxiq",
//     "id": "0208",
//     "name": "cable reverse-grip straight back seated high row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y_lxhRuJv+488D",
//     "id": "1320",
//     "name": "cable rope crossover seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/P1bvjtxzA_VNMT",
//     "id": "1321",
//     "name": "cable rope elevated seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wF3cmDX0coaiad",
//     "id": "1322",
//     "name": "cable rope extension incline bench row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wFMh32PiyJyXN8",
//     "id": "1639",
//     "name": "cable rope hammer preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Nv3pq=jIhTq8Ry",
//     "id": "1724",
//     "name": "cable rope high pulley overhead tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Gk2TfvtFL6y40b",
//     "id": "1725",
//     "name": "cable rope incline tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zfKU0-c9AYddPI",
//     "id": "1726",
//     "name": "cable rope lying on floor tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bkIXoiqwvVw2mw",
//     "id": "1640",
//     "name": "cable rope one arm hammer preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H17tK+Y5lGRTIL",
//     "id": "1323",
//     "name": "cable rope seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8onVA2lXKCyRB8",
//     "id": "0211",
//     "name": "cable russian twists (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZKK+FkOrVjBvpU",
//     "id": "2144",
//     "name": "cable seated chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eVm9mZtA4mOlUe",
//     "id": "0212",
//     "name": "cable seated crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/t1CDOcG706HSTs",
//     "id": "1641",
//     "name": "cable seated curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/b4sa4Q9ZX4Z_b1",
//     "id": "0213",
//     "name": "cable seated high row (v-bar)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/j=L_5wr=1RKBN7",
//     "id": "0214",
//     "name": "cable seated one arm alternate row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QdyIrPLPRW+s0E",
//     "id": "1642",
//     "name": "cable seated one arm concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qnKo9Ufh2bjWBC",
//     "id": "1643",
//     "name": "cable seated overhead curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rPQoG8aMrV1jAm",
//     "id": "0215",
//     "name": "cable seated rear lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zDrw+ge=MJcZdn",
//     "id": "0861",
//     "name": "cable seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_+Nz+cOBf+lN8M",
//     "id": "0216",
//     "name": "cable seated shoulder internal rotation",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VCLE54bQBDFQc3",
//     "id": "2399",
//     "name": "cable seated twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ezfFtazXJpEE4M",
//     "id": "0218",
//     "name": "cable seated wide-grip row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qdRc4g5VvaY7YU",
//     "id": "0219",
//     "name": "cable shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WLCgtazBPMQ9kb",
//     "id": "0220",
//     "name": "cable shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LwXKW_+GBv3Ues",
//     "id": "0222",
//     "name": "cable side bend",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vK6OM_+nei+zR5",
//     "id": "0221",
//     "name": "cable side bend crunch (bosu ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XvWgfV=VpQZkuu",
//     "id": "0223",
//     "name": "cable side crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D3rRUrcobIKlk5",
//     "id": "1717",
//     "name": "cable squat row (with rope attachment)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/haxbNkBcoIg981",
//     "id": "1644",
//     "name": "cable squatting curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/s2vi0wzLDX7mJe",
//     "id": "0224",
//     "name": "cable standing back wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5vFyvA-6yf8f9A",
//     "id": "1375",
//     "name": "cable standing calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0K5Wmm_IkdOZDP",
//     "id": "0225",
//     "name": "cable standing cross-over high reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Mvg9yEDQNO1YA6",
//     "id": "0226",
//     "name": "cable standing crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JeU9zInUli5=LN",
//     "id": "0874",
//     "name": "cable standing crunch (with rope attachment)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CX_LOz5gOOuFvt",
//     "id": "0227",
//     "name": "cable standing fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+IuHlJRuG+R=vt",
//     "id": "0228",
//     "name": "cable standing hip extension",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DjGCxgVUBInTZw",
//     "id": "0229",
//     "name": "cable standing inner curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hDa4VlOFptqXSf",
//     "id": "0230",
//     "name": "cable standing lift",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rE5vkgfXwuVbQM",
//     "id": "0231",
//     "name": "cable standing one arm triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/k_qMT5mAn95ode",
//     "id": "1376",
//     "name": "cable standing one leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_Q=XV_p7An9KAu",
//     "id": "0232",
//     "name": "cable standing pulldown (with rope)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-X-aIB=2CLYc_B",
//     "id": "0233",
//     "name": "cable standing rear delt row (with rope)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/b6AXOMYmmsPciU",
//     "id": "1727",
//     "name": "cable standing reverse grip one arm overhead tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hm8XNhn85bgBJt",
//     "id": "0234",
//     "name": "cable standing row (v-bar)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/t1m941QSiSs1DJ",
//     "id": "0235",
//     "name": "cable standing shoulder external rotation",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hw=9dGeOkO3rmc",
//     "id": "0236",
//     "name": "cable standing twist row (v-bar)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Op_Tddqer_XQmR",
//     "id": "1269",
//     "name": "cable standing up straight crossovers",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fCZo_vD+W2UZbn",
//     "id": "0238",
//     "name": "cable straight arm pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Uo9vPAOZmjWvPl",
//     "id": "0237",
//     "name": "cable straight arm pulldown (with rope)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Rnl1J-8-PAfr84",
//     "id": "0239",
//     "name": "cable straight back seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nGZrbR636btO3S",
//     "id": "0240",
//     "name": "cable supine reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bKbuwVjo=L3qS5",
//     "id": "2464",
//     "name": "cable thibaudeau kayak row",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NMG7a5sFLcidCD",
//     "id": "0241",
//     "name": "cable triceps pushdown (v-bar)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6ZaGPybWW9mau-",
//     "id": "2405",
//     "name": "cable triceps pushdown (v-bar) (with arm blaster)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D00Rg3PsKs7mWX",
//     "id": "0242",
//     "name": "cable tuck reverse crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lhuDVRrJwL2gBg",
//     "id": "0243",
//     "name": "cable twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IU2uvPoD=Bjj=s",
//     "id": "0862",
//     "name": "cable twist (up-down)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/100Z1sNQ6ZnUDH",
//     "id": "0244",
//     "name": "cable twisting pull",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=O5zP8X-Vugds9",
//     "id": "1645",
//     "name": "cable two arm curl on incline bench",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5HxcLaM=T-VAMV",
//     "id": "1728",
//     "name": "cable two arm tricep kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/E5fmjkeNWJIyXj",
//     "id": "0245",
//     "name": "cable underhand pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Z8mCyEuxMzrW2B",
//     "id": "1270",
//     "name": "cable upper chest crossovers",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pgvMjqngphelFo",
//     "id": "1324",
//     "name": "cable upper row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yzniiKom+V=1Uj",
//     "id": "0246",
//     "name": "cable upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NWqh-1uI8AiiJI",
//     "id": "1325",
//     "name": "cable wide grip rear pulldown behind neck",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ddzTi5==4haCWI",
//     "id": "0247",
//     "name": "cable wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6HrzOHmG6xI7ke",
//     "id": "1407",
//     "name": "calf push stretch with hands against wall",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tZ+LM-yOQw1kZV",
//     "id": "1377",
//     "name": "calf stretch with hands against wall",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zAuHZIin2Nim3W",
//     "id": "1378",
//     "name": "calf stretch with rope",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3ut6C1urrbUPzm",
//     "id": "0248",
//     "name": "cambered bar lying row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7L=h9XiT_8Ybzv",
//     "id": "2963",
//     "name": "captains chair straight leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nkwNRbNUqQXI80",
//     "id": "1548",
//     "name": "chair leg extended stretch",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jfMpHCISpVKGAB",
//     "id": "1271",
//     "name": "chest and front of shoulder stretch",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/a+J-v4xtrZIVVi",
//     "id": "0251",
//     "name": "chest dip",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dUIIz3VIw8DCyK",
//     "id": "1430",
//     "name": "chest dip (on dip-pull-up cage)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v8Ay3p=XFMd+nx",
//     "id": "2462",
//     "name": "chest dip on straight bar",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cUugkf4sxzeC0d",
//     "id": "1272",
//     "name": "chest stretch with exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mukH3b=yYLRQd6",
//     "id": "3216",
//     "name": "chest tap push-up (male)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TqfJmGzylH3p86",
//     "id": "1326",
//     "name": "chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PkB0tbRfLHcy2X",
//     "id": "0253",
//     "name": "chin-ups (narrow parallel grip)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+m_2o0U9ax-p0G",
//     "id": "0257",
//     "name": "circles knee stretch",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QOzfWpA=VOn41S",
//     "id": "1273",
//     "name": "clap push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3NCHOGlli4Oo=5",
//     "id": "0258",
//     "name": "clock push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BL8BsBSeTYpznP",
//     "id": "1327",
//     "name": "close grip chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/w7vXzuU1ldqA=2",
//     "id": "0259",
//     "name": "close-grip push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3VSD4qF6JeWdnY",
//     "id": "2398",
//     "name": "close-grip push-up (on knees)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QF3GXDxpGfv77B",
//     "id": "0260",
//     "name": "cocoons",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BMcjGwTA=A6Oo+",
//     "id": "1468",
//     "name": "crab twist toe touch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NiAN9vAwZj9VBl",
//     "id": "0262",
//     "name": "cross body crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oMv1gW2C=-48ka",
//     "id": "0267",
//     "name": "crunch (hands overhead)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/h8ec6P3isgi7xY",
//     "id": "0271",
//     "name": "crunch (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dvC5XcWJmYHu_a",
//     "id": "0272",
//     "name": "crunch (on stability ball, arms straight)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OMysuV_oHUgbRi",
//     "id": "0274",
//     "name": "crunch floor",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IH_8Lk7frwpsg_",
//     "id": "3016",
//     "name": "curl-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4T-Ku7j1gExu=_",
//     "id": "3769",
//     "name": "curtsey squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+0n0y08i4ZEdiB",
//     "id": "2331",
//     "name": "cycle cross trainer",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Q7w7FVhwNUKNW1",
//     "id": "0276",
//     "name": "dead bug",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=1eZduO6DdmC=Y",
//     "id": "0277",
//     "name": "decline crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uuQBSJBLtdm_=M",
//     "id": "0279",
//     "name": "decline push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KUBAR_oAsz=DuB",
//     "id": "0282",
//     "name": "decline sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WEuZETaPmkBrFp",
//     "id": "1274",
//     "name": "deep push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vCFTbh3wJ=SRZv",
//     "id": "0283",
//     "name": "diamond push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6S_pgKpmrtgqsZ",
//     "id": "0284",
//     "name": "donkey calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7vN+C3f3szT794",
//     "id": "1275",
//     "name": "drop push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mLYKa-2dTh+FWp",
//     "id": "0285",
//     "name": "dumbbell alternate biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TtmZrpJdgGyt-V",
//     "id": "2403",
//     "name": "dumbbell alternate biceps curl (with arm blaster)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yBmkeBoqXNxvYm",
//     "id": "1646",
//     "name": "dumbbell alternate hammer preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gMLMi05kZnYpRw",
//     "id": "1647",
//     "name": "dumbbell alternate preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mYbKPT0DhV8iuh",
//     "id": "1648",
//     "name": "dumbbell alternate seated hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/56pOjNBMAUCzU-",
//     "id": "0286",
//     "name": "dumbbell alternate side press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kd+aFN5HpiSpCp",
//     "id": "1649",
//     "name": "dumbbell alternating bicep curl with leg raised on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HitQhwnTAbAniS",
//     "id": "1650",
//     "name": "dumbbell alternating seated bicep curl on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rslA-8Ri4F8SPx",
//     "id": "2137",
//     "name": "dumbbell arnold press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RFQRH2l+ENHl7o",
//     "id": "0287",
//     "name": "dumbbell arnold press v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cS=Mb1A_6P1ew1",
//     "id": "0288",
//     "name": "dumbbell around pullover",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5d3m6wtWwhE+vE",
//     "id": "0289",
//     "name": "dumbbell bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/c0plPzfbJ2LN7x",
//     "id": "0290",
//     "name": "dumbbell bench seated press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/If2hWb3SDtfS9m",
//     "id": "0291",
//     "name": "dumbbell bench squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fgRlYN3gI5Y8Pb",
//     "id": "0293",
//     "name": "dumbbell bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZyWeTjNqQwGntF",
//     "id": "1651",
//     "name": "dumbbell bicep curl lunge with bowling motion",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8GgaW=VI7E2-2h",
//     "id": "1652",
//     "name": "dumbbell bicep curl on exercise ball with leg raised",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PGQbh3cUxOigbM",
//     "id": "1653",
//     "name": "dumbbell bicep curl with stork stance",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ywSuElVxYFscXc",
//     "id": "0294",
//     "name": "dumbbell biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/c4TP5er2bok_so",
//     "id": "2401",
//     "name": "dumbbell biceps curl (with arm blaster)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A4GKmhk+ZvupVE",
//     "id": "1654",
//     "name": "dumbbell biceps curl reverse",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FWXibua32B2Cuw",
//     "id": "1655",
//     "name": "dumbbell biceps curl squat",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/prBvF8JjsfpbFW",
//     "id": "1656",
//     "name": "dumbbell biceps curl v sit on bosu ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p7Hs11N_7++ohp",
//     "id": "1201",
//     "name": "dumbbell burpee",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yD98SKfQ9GYYYn",
//     "id": "0295",
//     "name": "dumbbell clean",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/STByROmFcgws+s",
//     "id": "1731",
//     "name": "dumbbell close grip press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+J08B7o3NZgY6_",
//     "id": "0296",
//     "name": "dumbbell close-grip press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8ZH6W_sqEs95yh",
//     "id": "0297",
//     "name": "dumbbell concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ChKc87ToJeh0cM",
//     "id": "3635",
//     "name": "dumbbell contralateral forward lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/r809d7-TFUP=ed",
//     "id": "0298",
//     "name": "dumbbell cross body hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/izu+FKTafmFwYU",
//     "id": "1657",
//     "name": "dumbbell cross body hammer curl v. 2",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CkIjW=gN50M1pc",
//     "id": "0299",
//     "name": "dumbbell cuban press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RXbx4i7J5jzW08",
//     "id": "2136",
//     "name": "dumbbell cuban press v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Xt5zTLcepP_oQN",
//     "id": "0300",
//     "name": "dumbbell deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eU6mCk5TNjMvNr",
//     "id": "0301",
//     "name": "dumbbell decline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JIWqhK=aCXDrIv",
//     "id": "0302",
//     "name": "dumbbell decline fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ABXoViiEff2Crw",
//     "id": "0303",
//     "name": "dumbbell decline hammer press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ku7YGboWkpFK9s",
//     "id": "1276",
//     "name": "dumbbell decline one arm fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5_fnjtWPRPaRYZ",
//     "id": "1617",
//     "name": "dumbbell decline one arm hammer press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oNMQGFR=5BWA3P",
//     "id": "0305",
//     "name": "dumbbell decline shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NEPiwr7kMKWbCt",
//     "id": "0304",
//     "name": "dumbbell decline shrug v. 2",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eGKmRwy5oFz=XX",
//     "id": "0306",
//     "name": "dumbbell decline triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bb9Awuw7bWrwZX",
//     "id": "0307",
//     "name": "dumbbell decline twist fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7mWSJhIZzBq5QB",
//     "id": "1437",
//     "name": "dumbbell finger curls",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uGteKAs9Qua2th",
//     "id": "0308",
//     "name": "dumbbell fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p00WSCdY9=1Dxz",
//     "id": "1277",
//     "name": "dumbbell fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hncQY3I3cMWFQw",
//     "id": "1732",
//     "name": "dumbbell forward lunge triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V-pM0sD0tjBE0c",
//     "id": "0310",
//     "name": "dumbbell front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/n3Bpum9Hmy11tG",
//     "id": "0309",
//     "name": "dumbbell front raise v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-1_yO+la_pst5c",
//     "id": "0311",
//     "name": "dumbbell full can lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XAHtpCXxBRZYd0",
//     "id": "1760",
//     "name": "dumbbell goblet squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KtVYQcVXwFI4Gm",
//     "id": "0313",
//     "name": "dumbbell hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WhxILwKDNYkbXh",
//     "id": "1659",
//     "name": "dumbbell hammer curl on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ubbe-4WGwOUDjP",
//     "id": "0312",
//     "name": "dumbbell hammer curl v. 2",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nCLaTVzrjlQsOy",
//     "id": "2402",
//     "name": "dumbbell hammer curls (with arm blaster)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NUKlvIE+Bwy0_T",
//     "id": "1664",
//     "name": "dumbbell high curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_KP3qJoqEg5PH1",
//     "id": "3545",
//     "name": "dumbbell incline alternate press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5WmL+TJWTf7JCV",
//     "id": "0314",
//     "name": "dumbbell incline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3nkizu1IOlq0mq",
//     "id": "0315",
//     "name": "dumbbell incline biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JgD8QUS_Ql9pTg",
//     "id": "0316",
//     "name": "dumbbell incline breeding",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nqeSA0H1SG87Zz",
//     "id": "0318",
//     "name": "dumbbell incline curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SGfR-ZaATvY7PX",
//     "id": "0317",
//     "name": "dumbbell incline curl v. 2",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/L5XUtXFzB-SsPz",
//     "id": "0319",
//     "name": "dumbbell incline fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eTZ=UV-FULK69C",
//     "id": "1278",
//     "name": "dumbbell incline fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mpWAdXQYUO7gys",
//     "id": "0320",
//     "name": "dumbbell incline hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5-umidasxMBxMM",
//     "id": "0321",
//     "name": "dumbbell incline hammer press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HdXhCVSXQGlx0+",
//     "id": "1618",
//     "name": "dumbbell incline hammer press on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wWdTdgdWhAhgGZ",
//     "id": "0322",
//     "name": "dumbbell incline inner biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/s3Z23-vcGXTV4z",
//     "id": "1279",
//     "name": "dumbbell incline one arm fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PlX2B1C_RThCm0",
//     "id": "1280",
//     "name": "dumbbell incline one arm fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GMHkCiwzMcGOT4",
//     "id": "1619",
//     "name": "dumbbell incline one arm hammer press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eHsweM_K772nrM",
//     "id": "1620",
//     "name": "dumbbell incline one arm hammer press on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZdzYCdVfOvIelT",
//     "id": "0323",
//     "name": "dumbbell incline one arm lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WXgJOV=Y1_IOpg",
//     "id": "1281",
//     "name": "dumbbell incline one arm press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/a7V4cRgu8XCUCL",
//     "id": "1282",
//     "name": "dumbbell incline one arm press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jJZwOMb59MMBhd",
//     "id": "0324",
//     "name": "dumbbell incline palm-in press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XzYvKz1TYOEozO",
//     "id": "1283",
//     "name": "dumbbell incline press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zaWvGfBwh4GsQj",
//     "id": "0325",
//     "name": "dumbbell incline raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SAxh8Uo4nXd4HH",
//     "id": "0326",
//     "name": "dumbbell incline rear lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ChAL92XxIuWAct",
//     "id": "0327",
//     "name": "dumbbell incline row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ahUoWRz3LZ_CKr",
//     "id": "0328",
//     "name": "dumbbell incline shoulder raise",
//     "target": "serratus anterior"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FIi1S4nvxW=AX=",
//     "id": "0329",
//     "name": "dumbbell incline shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WWFvZVokXEfq8k",
//     "id": "3542",
//     "name": "dumbbell incline t-raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IMfmvw_kRpMcva",
//     "id": "0330",
//     "name": "dumbbell incline triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Fefid6AbQFBVcp",
//     "id": "0331",
//     "name": "dumbbell incline twisted flyes",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JHOehq1+jh5J7R",
//     "id": "1733",
//     "name": "dumbbell incline two arm extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AzzKIGDaAXyJDC",
//     "id": "3541",
//     "name": "dumbbell incline y-raise",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NgjOJKI4Kk_F54",
//     "id": "0332",
//     "name": "dumbbell iron cross",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A9OgQwYaSmHDyR",
//     "id": "0333",
//     "name": "dumbbell kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/f4zlCRgIq+g3ft",
//     "id": "1734",
//     "name": "dumbbell kickbacks on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QisokhWzK5b2jH",
//     "id": "1660",
//     "name": "dumbbell kneeling bicep curl exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZR9um99RwLEPVs",
//     "id": "0334",
//     "name": "dumbbell lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MDSYR7=o+hvaye",
//     "id": "0335",
//     "name": "dumbbell lateral to front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RIUp4Pl+RWV7F1",
//     "id": "0336",
//     "name": "dumbbell lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LNJieIcJQxIrfg",
//     "id": "1658",
//     "name": "dumbbell lunge with bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/--cvhVzHGYvVhV",
//     "id": "0337",
//     "name": "dumbbell lying  extension (across face)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PL0fVBNDfs3ggw",
//     "id": "1729",
//     "name": "dumbbell lying alternate extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kA28H8C_YCbwjs",
//     "id": "0338",
//     "name": "dumbbell lying elbow press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/u0x2qInL8cx8yE",
//     "id": "0863",
//     "name": "dumbbell lying external shoulder rotation",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/C3D15Lf-InwWHx",
//     "id": "0339",
//     "name": "dumbbell lying femoral",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yMUVUJlFdm_z9=",
//     "id": "0340",
//     "name": "dumbbell lying hammer press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LcdAa8Qv+lllFh",
//     "id": "2470",
//     "name": "dumbbell lying on floor rear delt raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gv9SzJXO9FWfmJ",
//     "id": "0341",
//     "name": "dumbbell lying one arm deltoid rear",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PHNrmnlp5yC9G=",
//     "id": "0343",
//     "name": "dumbbell lying one arm press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qdxcATrgr2Q=dw",
//     "id": "0342",
//     "name": "dumbbell lying one arm press v. 2",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LfXJyFYcsI9ttj",
//     "id": "0344",
//     "name": "dumbbell lying one arm pronated triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/k0Cf2e6lUjq717",
//     "id": "0345",
//     "name": "dumbbell lying one arm rear lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mQIDRI+5XP4iqJ",
//     "id": "0346",
//     "name": "dumbbell lying one arm supinated triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NAtoW0Ozd7870D",
//     "id": "0347",
//     "name": "dumbbell lying pronation",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/okpD7Zux0SOjf6",
//     "id": "2705",
//     "name": "dumbbell lying pronation on floor",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Jk6ekh-8jwIwhc",
//     "id": "1284",
//     "name": "dumbbell lying pullover on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JGk6RhPSw5ushi",
//     "id": "1328",
//     "name": "dumbbell lying rear delt row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ERpan63fj1OIPv",
//     "id": "0348",
//     "name": "dumbbell lying rear lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Rxa_eMzOXg1n+_",
//     "id": "1735",
//     "name": "dumbbell lying single extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/g-xAOWMxGKNYy1",
//     "id": "0349",
//     "name": "dumbbell lying supination",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TiLRtQ7LQYzMLw",
//     "id": "2706",
//     "name": "dumbbell lying supination on floor",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/K=pPqW1veRdHhX",
//     "id": "1661",
//     "name": "dumbbell lying supine biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/syjHqiOC0ot4=I",
//     "id": "0350",
//     "name": "dumbbell lying supine curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eCl+oNDWJPj=WG",
//     "id": "0351",
//     "name": "dumbbell lying triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cQGDrsuVCrutvF",
//     "id": "1662",
//     "name": "dumbbell lying wide curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EmtU3FiyPqoSzU",
//     "id": "0352",
//     "name": "dumbbell neutral grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V_eOCCn+tqwFf-",
//     "id": "1285",
//     "name": "dumbbell one arm bench fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=j63mnviPy9CWJ",
//     "id": "0292",
//     "name": "dumbbell one arm bent-over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oWuMxiK5i4ex1t",
//     "id": "1286",
//     "name": "dumbbell one arm chest fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sRoQ-uN_KqiLEJ",
//     "id": "0353",
//     "name": "dumbbell one arm concetration curl (on stability ball)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/h42xUss96my6e3",
//     "id": "1287",
//     "name": "dumbbell one arm decline chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z_WCmwBAKxaa=1",
//     "id": "1288",
//     "name": "dumbbell one arm fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Nh4Cen_rPvK+9R",
//     "id": "1736",
//     "name": "dumbbell one arm french press on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Oox7TGAwDfQMvW",
//     "id": "1663",
//     "name": "dumbbell one arm hammer preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/07rWOORZ8-p7gP",
//     "id": "1621",
//     "name": "dumbbell one arm hammer press on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZRqfElpIq1Ak0-",
//     "id": "1289",
//     "name": "dumbbell one arm incline chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/89evTlqxQLw0jL",
//     "id": "0354",
//     "name": "dumbbell one arm kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/56t5iDtc_AMEPx",
//     "id": "0355",
//     "name": "dumbbell one arm lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/svHIRFb48Ij99z",
//     "id": "0356",
//     "name": "dumbbell one arm lateral raise with support",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/h=RU_EAEGygKz_",
//     "id": "1290",
//     "name": "dumbbell one arm press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H2Ro44CPhayoZ_",
//     "id": "1665",
//     "name": "dumbbell one arm prone curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MVykksqi9C_eXj",
//     "id": "1666",
//     "name": "dumbbell one arm prone hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BObC60GF0yb53a",
//     "id": "1291",
//     "name": "dumbbell one arm pullover on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MOXGoADLgU+=a+",
//     "id": "0358",
//     "name": "dumbbell one arm revers wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/edUHLnHWA1DqWC",
//     "id": "0359",
//     "name": "dumbbell one arm reverse fly (with support)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qVDD6=zJd409GI",
//     "id": "1622",
//     "name": "dumbbell one arm reverse grip press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7niYx+IEwz=sRU",
//     "id": "1414",
//     "name": "dumbbell one arm reverse preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0Cx_o1-n+=E8_E",
//     "id": "1667",
//     "name": "dumbbell one arm reverse spider curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GZvU4j9o+8T8yE",
//     "id": "1668",
//     "name": "dumbbell one arm seated bicep curl on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5H=ptODVhXQ4W8",
//     "id": "1669",
//     "name": "dumbbell one arm seated hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lZ=ahaY9lM+3Gk",
//     "id": "1415",
//     "name": "dumbbell one arm seated neutral wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0IYrv+QK58z2M=",
//     "id": "0361",
//     "name": "dumbbell one arm shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oBHsQA8czFOf=Z",
//     "id": "0360",
//     "name": "dumbbell one arm shoulder press v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bXtUawFwq_Abu+",
//     "id": "3888",
//     "name": "dumbbell one arm snatch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Z=hiB2CTAFPVtf",
//     "id": "1670",
//     "name": "dumbbell one arm standing curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xGCliwBn6AaFh+",
//     "id": "1671",
//     "name": "dumbbell one arm standing hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wXuUdi5HX8P9Ki",
//     "id": "0362",
//     "name": "dumbbell one arm triceps extension (on bench)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ka+aUqfMqhXnZf",
//     "id": "0363",
//     "name": "dumbbell one arm upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UGHQCkQo4umBgV",
//     "id": "0364",
//     "name": "dumbbell one arm wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hw8POxjL6SaZGJ",
//     "id": "1672",
//     "name": "dumbbell one arm zottman preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mz_ByWDmvFsfw-",
//     "id": "1292",
//     "name": "dumbbell one leg fly on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SlLIi-p3ldRrQ0",
//     "id": "0365",
//     "name": "dumbbell over bench neutral wrist curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/X6qZ5_DAXftLeo",
//     "id": "0366",
//     "name": "dumbbell over bench one arm  neutral wrist curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=i9p=+7Fty=1oW",
//     "id": "1441",
//     "name": "dumbbell over bench one arm reverse wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OT9c+ADJjVjztY",
//     "id": "0367",
//     "name": "dumbbell over bench one arm wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/f_pnz5Hce-cu-J",
//     "id": "0368",
//     "name": "dumbbell over bench revers wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3qT_B3W13V-Pxf",
//     "id": "0369",
//     "name": "dumbbell over bench wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dbtEqsvq+MbI3l",
//     "id": "1329",
//     "name": "dumbbell palm rotational bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0_QDBcSkaJXfxW",
//     "id": "1623",
//     "name": "dumbbell palms in incline bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BkWCqeq4i076nI",
//     "id": "0370",
//     "name": "dumbbell peacher hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QTdxoZ-WOzOj8_",
//     "id": "0371",
//     "name": "dumbbell plyo squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yl5nr-WiWBu344",
//     "id": "0372",
//     "name": "dumbbell preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Wf1-yObXWYYcAc",
//     "id": "1673",
//     "name": "dumbbell preacher curl over exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lFRJyjnIcwpFjJ",
//     "id": "1293",
//     "name": "dumbbell press on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/O5ta5wK5MN2VHF",
//     "id": "0373",
//     "name": "dumbbell pronate-grip triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XTn70vZVOw+IzI",
//     "id": "0374",
//     "name": "dumbbell prone incline curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7d_RFq0Ku5OLDm",
//     "id": "1674",
//     "name": "dumbbell prone incline hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WlkVml2ID5FH4y",
//     "id": "0375",
//     "name": "dumbbell pullover",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jBR21UhDejE4QL",
//     "id": "1294",
//     "name": "dumbbell pullover hip extension on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lvniJv-EpXq7=U",
//     "id": "1295",
//     "name": "dumbbell pullover on exercise ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HtD2w+qnCDGvJP",
//     "id": "1700",
//     "name": "dumbbell push press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7j7wcacQ5m6b+c",
//     "id": "0376",
//     "name": "dumbbell raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ecx304R_mBVycs",
//     "id": "2292",
//     "name": "dumbbell rear delt raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XJWC-er+qXN_CM",
//     "id": "0377",
//     "name": "dumbbell rear delt row_shoulder",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gWu4O_9Fdls9zq",
//     "id": "0378",
//     "name": "dumbbell rear fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fVHVDvVX1Hu+JW",
//     "id": "0380",
//     "name": "dumbbell rear lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MtP1yCiiluQP9T",
//     "id": "0379",
//     "name": "dumbbell rear lateral raise (support head)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3kdLbxwL4dgpr2",
//     "id": "0381",
//     "name": "dumbbell rear lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4RgXvkZw0mxZqe",
//     "id": "0382",
//     "name": "dumbbell revers grip biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VpofeLUSPi_xRQ",
//     "id": "1624",
//     "name": "dumbbell reverse bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8Ijg6pnAq88pMm",
//     "id": "0383",
//     "name": "dumbbell reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V4=DhBffjsMKTV",
//     "id": "1330",
//     "name": "dumbbell reverse grip incline bench one arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AklpX2sn20N4yH",
//     "id": "1331",
//     "name": "dumbbell reverse grip incline bench two arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pIchM3Q_PfiuT+",
//     "id": "2327",
//     "name": "dumbbell reverse grip row (female)",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kj2KGXulEbWkx3",
//     "id": "0384",
//     "name": "dumbbell reverse preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YSZOEPkVc05NRz",
//     "id": "1675",
//     "name": "dumbbell reverse spider curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7kDHMqTl7DtzX+",
//     "id": "0385",
//     "name": "dumbbell reverse wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PA4xNwe1yOMAEE",
//     "id": "1459",
//     "name": "dumbbell romanian deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cj7upj+4DnmttS",
//     "id": "0386",
//     "name": "dumbbell rotation reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8G1h96cRu+lKYp",
//     "id": "2397",
//     "name": "dumbbell scott press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=BZOmLSAZMUIiR",
//     "id": "0387",
//     "name": "dumbbell seated alternate front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jizl=NOky5JvOv",
//     "id": "1676",
//     "name": "dumbbell seated alternate hammer curl on exercise ball",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ClgIxFgPVNFdIa",
//     "id": "0388",
//     "name": "dumbbell seated alternate press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qorAv-BKDvYn5N",
//     "id": "3546",
//     "name": "dumbbell seated alternate shoulder",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5tBPgFmAdLbkZL",
//     "id": "0389",
//     "name": "dumbbell seated bench extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=1bFOr1MA2Gt8d",
//     "id": "2317",
//     "name": "dumbbell seated bent arm lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CLy5h8BHvRmybU",
//     "id": "1730",
//     "name": "dumbbell seated bent over alternate kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YPqsmX_1=67eUK",
//     "id": "1737",
//     "name": "dumbbell seated bent over triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tGrXO27YylKizh",
//     "id": "1677",
//     "name": "dumbbell seated bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oeYJq2+diFz6iX",
//     "id": "0390",
//     "name": "dumbbell seated biceps curl (on stability ball)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XbIXQl7SygmXXn",
//     "id": "3547",
//     "name": "dumbbell seated biceps curl to shoulder press",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uT7kHAwAjnZHJn",
//     "id": "1379",
//     "name": "dumbbell seated calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IXOKjfK4oT6Qe1",
//     "id": "0391",
//     "name": "dumbbell seated curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fRynCA46qP6ib5",
//     "id": "0392",
//     "name": "dumbbell seated front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tsj73p5eJtv7xq",
//     "id": "1678",
//     "name": "dumbbell seated hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/phQsjVdFKu5Bu6",
//     "id": "0393",
//     "name": "dumbbell seated inner biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/e6mmjT5gvOYPJr",
//     "id": "0394",
//     "name": "dumbbell seated kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fqVU+hDN+u-aJ-",
//     "id": "0396",
//     "name": "dumbbell seated lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/h-iOzjjFU_H9vs",
//     "id": "0395",
//     "name": "dumbbell seated lateral raise v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3Grq4R5xhFLL9s",
//     "id": "0397",
//     "name": "dumbbell seated neutral wrist curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sezOCwTwDEx0lo",
//     "id": "1679",
//     "name": "dumbbell seated one arm bicep curl on exercise ball with leg raised",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VFThA+2BiAMB3O",
//     "id": "0398",
//     "name": "dumbbell seated one arm kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uAykLHGEbcEisJ",
//     "id": "0399",
//     "name": "dumbbell seated one arm rotate",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7mgNo-g9=j3QEP",
//     "id": "0400",
//     "name": "dumbbell seated one leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Miy8xa_bLL3nHE",
//     "id": "1380",
//     "name": "dumbbell seated one leg calf raise - hammer grip",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Rj8+cbEin339nF",
//     "id": "1381",
//     "name": "dumbbell seated one leg calf raise - palm up",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UajQs1QcLrasTO",
//     "id": "0401",
//     "name": "dumbbell seated palms up wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sgOByN+RroY+Of",
//     "id": "0402",
//     "name": "dumbbell seated preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kEw4U4U+s7UKUg",
//     "id": "0403",
//     "name": "dumbbell seated revers grip concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wMP4gd0=djCeQV",
//     "id": "1738",
//     "name": "dumbbell seated reverse grip one arm overhead tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9WjfCrUT=CLsZP",
//     "id": "0405",
//     "name": "dumbbell seated shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZiR6jK4dT+2T3l",
//     "id": "0404",
//     "name": "dumbbell seated shoulder press (parallel grip)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hlKCyWbJ1ncx0C",
//     "id": "2188",
//     "name": "dumbbell seated triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/933kfU2-5=YZ0L",
//     "id": "0406",
//     "name": "dumbbell shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SsnAaL4uqMQCsO",
//     "id": "0407",
//     "name": "dumbbell side bend",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dC51OmQT5vB6Dy",
//     "id": "0408",
//     "name": "dumbbell side lying one hand raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/g=u=b3Hsa2COKA",
//     "id": "3664",
//     "name": "dumbbell side plank with rear fly",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BafQYEgJqsNcF4",
//     "id": "3548",
//     "name": "dumbbell single arm overhead carry",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jckpPg5sK_+jfq",
//     "id": "0409",
//     "name": "dumbbell single leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=A=xh0LydyGQ8h",
//     "id": "1757",
//     "name": "dumbbell single leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KHTIjLQnTEuoLb",
//     "id": "2805",
//     "name": "dumbbell single leg deadlift with stepbox support",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gQ91jMk2O1aAy9",
//     "id": "0410",
//     "name": "dumbbell single leg split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tiL5BMW4nKwQCm",
//     "id": "0411",
//     "name": "dumbbell single leg squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QWcBQ4RP8wcrEb",
//     "id": "0413",
//     "name": "dumbbell squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/C6OYJFLM2a7cWh",
//     "id": "3560",
//     "name": "dumbbell standing alternate hammer curl and press",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gu-GSle8ZPv10c",
//     "id": "0414",
//     "name": "dumbbell standing alternate overhead press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vuZt4lhiuTV1K3",
//     "id": "0415",
//     "name": "dumbbell standing alternate raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RKKay_4o38LZ_L",
//     "id": "1739",
//     "name": "dumbbell standing alternating tricep kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3oRPM4Pto9OifH",
//     "id": "2143",
//     "name": "dumbbell standing around world",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/L=yUCSyeIl1mFY",
//     "id": "1740",
//     "name": "dumbbell standing bent over one arm triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lKPJpoI9K8nrKl",
//     "id": "1741",
//     "name": "dumbbell standing bent over two arm triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Kvd8HPFvs0lxXd",
//     "id": "0416",
//     "name": "dumbbell standing biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A7DN0um7YX2oWm",
//     "id": "0417",
//     "name": "dumbbell standing calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZSDk67-nSEnrn_",
//     "id": "0418",
//     "name": "dumbbell standing concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fNUhiyCNs0mC3O",
//     "id": "0419",
//     "name": "dumbbell standing front raise above head",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cz8AKe70yQ6jbf",
//     "id": "2321",
//     "name": "dumbbell standing inner biceps curl v. 2",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VyNKIu89xXvqUt",
//     "id": "0420",
//     "name": "dumbbell standing kickback",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Dubm09is+-rkwQ",
//     "id": "0421",
//     "name": "dumbbell standing one arm concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Q0geYz=zEVuQKq",
//     "id": "0422",
//     "name": "dumbbell standing one arm curl (over incline bench)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LgGL4yhQB_5XIL",
//     "id": "1680",
//     "name": "dumbbell standing one arm curl over incline bench",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H0Lk_JLVvCZRNK",
//     "id": "0423",
//     "name": "dumbbell standing one arm extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QdQcLOeegmCqQJ",
//     "id": "0424",
//     "name": "dumbbell standing one arm palm in press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Bq4i0wsAtoJmxv",
//     "id": "0425",
//     "name": "dumbbell standing one arm reverse curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DQf2eroPVR9ueV",
//     "id": "0426",
//     "name": "dumbbell standing overhead press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=36GAFfvj_vw1A",
//     "id": "0427",
//     "name": "dumbbell standing palms in press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v_1IaCp5uBcuZ5",
//     "id": "0428",
//     "name": "dumbbell standing preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+NYumZC=jRJFym",
//     "id": "0429",
//     "name": "dumbbell standing reverse curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5FuDJezXcNprKm",
//     "id": "0430",
//     "name": "dumbbell standing triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mxcC3YzEn8lnVN",
//     "id": "2293",
//     "name": "dumbbell standing zottman preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EWNq6HG5+km0Ij",
//     "id": "1684",
//     "name": "dumbbell step up single leg balance with bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LHwsBo_PFxVzt3",
//     "id": "0431",
//     "name": "dumbbell step-up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pA42bUAyNB8TWV",
//     "id": "2796",
//     "name": "dumbbell step-up lunge",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EsTbykPqg8G_ia",
//     "id": "2812",
//     "name": "dumbbell step-up split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GvsADR1loHrAo2",
//     "id": "0432",
//     "name": "dumbbell stiff leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LtNKB2VM_l340p",
//     "id": "0433",
//     "name": "dumbbell straight arm pullover",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_EZTPPHFtH_oA6",
//     "id": "0434",
//     "name": "dumbbell straight leg deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IB-BrqEWSztQjV",
//     "id": "2808",
//     "name": "dumbbell sumo pull through",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Nuay5S35HZSq=P",
//     "id": "2803",
//     "name": "dumbbell supported squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PeRppj+IkI1a+L",
//     "id": "0436",
//     "name": "dumbbell tate press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/psF+O2ZFdxhd7_",
//     "id": "1742",
//     "name": "dumbbell tricep kickback with stork stance",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JcJGjf1qX6JHGN",
//     "id": "1743",
//     "name": "dumbbell twisting bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=XMr_oA0fxy_ot",
//     "id": "0437",
//     "name": "dumbbell upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/j2T5gWNh-UxwXx",
//     "id": "1765",
//     "name": "dumbbell upright row (back pov)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Yiou4mGdT4ql45",
//     "id": "0864",
//     "name": "dumbbell upright shoulder external rotation",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pIYsxXedeAKs6I",
//     "id": "5201",
//     "name": "dumbbell waiter biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p1-BPM4QmfC+w=",
//     "id": "0438",
//     "name": "dumbbell w-press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/llYhyzfihnxIze",
//     "id": "0439",
//     "name": "dumbbell zottman curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vzKto6Y7ihQJbs",
//     "id": "2294",
//     "name": "dumbbell zottman preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/y8fohfcZPt5+nQ",
//     "id": "2189",
//     "name": "dumbbells seated triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/F+xRHKIj91OGTo",
//     "id": "1167",
//     "name": "dynamic chest stretch (male)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0fguRY-LeZ-=Z4",
//     "id": "3287",
//     "name": "elbow dips",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/isNsSgUXZ4=INi",
//     "id": "1772",
//     "name": "elbow lift - reverse push-up",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dlfAl+PwWA6hRy",
//     "id": "0443",
//     "name": "elbow-to-knee",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JQL+OKc+Z-R=Zp",
//     "id": "3292",
//     "name": "elevator",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/E9Q-B9tFGL1daT",
//     "id": "1332",
//     "name": "exercise ball alternating arm ups",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/P1FihFBy=8pizN",
//     "id": "1333",
//     "name": "exercise ball back extension with arms extended",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Qqdtuvvujf6ir-",
//     "id": "1334",
//     "name": "exercise ball back extension with hands behind head",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6_2RRks59fqd_=",
//     "id": "1335",
//     "name": "exercise ball back extension with knees off ground",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/24R6Pc6caFY==l",
//     "id": "1336",
//     "name": "exercise ball back extension with rotation",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/W_4xYBxQAcne85",
//     "id": "1744",
//     "name": "exercise ball dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ke3o2hAhWv6t7c",
//     "id": "1559",
//     "name": "exercise ball hip flexor stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Xh=C6ttm9hitUn",
//     "id": "1338",
//     "name": "exercise ball hug",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zieXNVlNhjFNQK",
//     "id": "1339",
//     "name": "exercise ball lat stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BFfXlcF7dE7tO9",
//     "id": "1341",
//     "name": "exercise ball lower back stretch (pyramid)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uDHTloKJexTZCD",
//     "id": "1342",
//     "name": "exercise ball lying side lat stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_uoPAtfrU7HLz4",
//     "id": "1382",
//     "name": "exercise ball on the wall calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WmZFc8pblC1JN4",
//     "id": "3241",
//     "name": "exercise ball on the wall calf raise (tennis ball between ankles)",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+GxWYOCiz8mLC+",
//     "id": "3240",
//     "name": "exercise ball on the wall calf raise (tennis ball between knees)",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5Pp9YEz3lfOvF=",
//     "id": "1416",
//     "name": "exercise ball one leg prone lower body rotation",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/om2v_WOn+CrTlA",
//     "id": "1417",
//     "name": "exercise ball one legged diagonal kick hamstring curl",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B18+9S4WU0dn3p",
//     "id": "1296",
//     "name": "exercise ball pike push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zary-h=BrPtdbq",
//     "id": "1343",
//     "name": "exercise ball prone leg raise",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/J3Z6tizKUuWVNd",
//     "id": "1560",
//     "name": "exercise ball seated hamstring stretch",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3Lsat=Ghe1fDRy",
//     "id": "1745",
//     "name": "exercise ball seated triceps stretch",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xX0DqfpjfNr90h",
//     "id": "1746",
//     "name": "exercise ball supine triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ST1tbOa4SSjNBz",
//     "id": "1747",
//     "name": "ez bar french press on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BMOgG1VJUeVJiV",
//     "id": "3010",
//     "name": "ez bar lying bent arms pullover",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QvMT_RD2zD+H1H",
//     "id": "1748",
//     "name": "ez bar lying close grip triceps extension behind head",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3t65_cKTTzG2C6",
//     "id": "1344",
//     "name": "ez bar reverse grip bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1m6aHwLaO_tH2M",
//     "id": "1682",
//     "name": "ez bar seated close grip concentration curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PEZXsiM9+UBhFY",
//     "id": "1749",
//     "name": "ez bar standing french press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tmRhAMPdpXzaVT",
//     "id": "0445",
//     "name": "ez barbell anti gravity press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eG-d34c+W2gg9e",
//     "id": "1627",
//     "name": "ez barbell close grip preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mAGqSNNBkE1suU",
//     "id": "0446",
//     "name": "ez barbell close-grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hsdZPqc6Ek6a9f",
//     "id": "0447",
//     "name": "ez barbell curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8fTB22QBCzdWgc",
//     "id": "0448",
//     "name": "ez barbell decline close grip face press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UbTkAisipnsyx1",
//     "id": "2186",
//     "name": "ez barbell decline triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/66-Kk0GEADFran",
//     "id": "0449",
//     "name": "ez barbell incline triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6XyRODILxXxdTs",
//     "id": "0450",
//     "name": "ez barbell jm bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wZ3XedL-9Mq-EP",
//     "id": "0451",
//     "name": "ez barbell reverse grip curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IBe1JHAXS3e6aR",
//     "id": "0452",
//     "name": "ez barbell reverse grip preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GANQChac-Wkhup",
//     "id": "1458",
//     "name": "ez barbell seated curls",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YL0=O1GfyXy68g",
//     "id": "0453",
//     "name": "ez barbell seated triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V-uNcB=o_49reI",
//     "id": "0454",
//     "name": "ez barbell spider curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FOi3Uz4psnFvGS",
//     "id": "1628",
//     "name": "ez barbell spider curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zOqgB7XXIXRAvs",
//     "id": "2404",
//     "name": "ez-bar biceps curl (with arm blaster)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/P4rt8xhXA07XR_",
//     "id": "2432",
//     "name": "ez-bar close-grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "ez barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yH4BoEO7Wmbw2j",
//     "id": "2741",
//     "name": "ez-barbell standing wide grip biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wUYREkCnx_KONu",
//     "id": "2133",
//     "name": "farmers walk",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QTEO+F2zonrvx=",
//     "id": "0455",
//     "name": "finger curls",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/b73XeqfHvNwm9b",
//     "id": "3303",
//     "name": "flag",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DKif7uV4POmlUL",
//     "id": "0456",
//     "name": "flexion leg sit up (bent knee)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VC-0bYH+ECqgNv",
//     "id": "0457",
//     "name": "flexion leg sit up (straight arm)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Xk4m-+VdJ6ccWT",
//     "id": "0458",
//     "name": "floor fly (with barbell)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jSP6o2v+y2_cdp",
//     "id": "0459",
//     "name": "flutter kicks",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bmKr1TWsr4Ej9G",
//     "id": "1472",
//     "name": "forward jump",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vG7qq2gq-WQldr",
//     "id": "3470",
//     "name": "forward lunge (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3P0oB53V6mjMAc",
//     "id": "3194",
//     "name": "frankenstein squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/la8621l+PFbayR",
//     "id": "2429",
//     "name": "frog crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oGtW4uOFnS=LbY",
//     "id": "3301",
//     "name": "frog planche",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/a+XePDplG=Fav6",
//     "id": "3296",
//     "name": "front lever",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qKGhIOsrdLM6-3",
//     "id": "3295",
//     "name": "front lever reps",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ewRO8UCMtaEab2",
//     "id": "0464",
//     "name": "front plank with twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/l49c3r0cyK_HrN",
//     "id": "3315",
//     "name": "full maltese",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5UB=1ZdlNp6oin",
//     "id": "3299",
//     "name": "full planche",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fHy253PvawEQ5h",
//     "id": "3327",
//     "name": "full planche push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iQ_fw+G9ro15Ix",
//     "id": "0466",
//     "name": "gironda sternum chin",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1owN3e12ex4rcp",
//     "id": "3561",
//     "name": "glute bridge march",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sIfD077DBpqM4X",
//     "id": "3523",
//     "name": "glute bridge two legs on bench (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kEMmvdRsWLHwl0",
//     "id": "3193",
//     "name": "glute-ham raise",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kIaxb302M_fetS",
//     "id": "0467",
//     "name": "gorilla chin",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZlwVHZRk_P==zA",
//     "id": "0469",
//     "name": "groin crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/K1qmsqNuNH=lcz",
//     "id": "1383",
//     "name": "hack calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1nyqcGKHo1thMc",
//     "id": "1384",
//     "name": "hack one leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nXa44cP-HJ-mdS",
//     "id": "3221",
//     "name": "half knee bends (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LwU5Xl+w-UOGzs",
//     "id": "3202",
//     "name": "half sit-up (male)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qYHkS+0-OYYVCt",
//     "id": "1511",
//     "name": "hamstring stretch",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "upper body ergometer",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nBF8=LUxwoOJj+",
//     "id": "2139",
//     "name": "hands bike",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hrRKu03qX_Oe+w",
//     "id": "3218",
//     "name": "hands clasped circular toe touch (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7MaHhZgI_GygyT",
//     "id": "3215",
//     "name": "hands reversed clasped circular toe touch (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ga__fK_3gu2JT1",
//     "id": "3302",
//     "name": "handstand",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aZXeUZgmOWLoAp",
//     "id": "0471",
//     "name": "handstand push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QmGAXoiqX=jLo+",
//     "id": "1764",
//     "name": "hanging leg hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qejKKHcN+JiZqJ",
//     "id": "0472",
//     "name": "hanging leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JbTmwOxZzv0p+d",
//     "id": "1761",
//     "name": "hanging oblique knee raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qOfJ9euMG4kZOa",
//     "id": "0473",
//     "name": "hanging pike",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EcxdyCjBalO1j9",
//     "id": "0474",
//     "name": "hanging straight leg hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/d2A8QRxp=9LRqf",
//     "id": "0475",
//     "name": "hanging straight leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sHxRxGZTIvzj65",
//     "id": "0476",
//     "name": "hanging straight twisting leg hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rBynA5_9huAq-t",
//     "id": "3636",
//     "name": "high knee against wall",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hsvq0MJT+P_Yr0",
//     "id": "0484",
//     "name": "hip raise (bent knee)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/u=x_0zNkk_Gd91",
//     "id": "1418",
//     "name": "hug keens to chest",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cKJwHjWOB39Wjz",
//     "id": "3234",
//     "name": "hyght dumbbell fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fEH0oEarSF6gXQ",
//     "id": "0489",
//     "name": "hyperextension",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dtwlRbA3-bDJI2",
//     "id": "0488",
//     "name": "hyperextension (on bench)",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A9SD7xShi+_Hsl",
//     "id": "3289",
//     "name": "impossible dips",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y+KYQA9YfpCIQE",
//     "id": "1471",
//     "name": "inchworm",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IIIzInrEBmK+tA",
//     "id": "3698",
//     "name": "inchworm v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D85P_yIUlPsBR7",
//     "id": "0490",
//     "name": "incline close-grip push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_ue95wePI4h_uE",
//     "id": "0491",
//     "name": "incline leg hip raise (leg straight)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vdT132knfwHR8T",
//     "id": "0492",
//     "name": "incline push up depth jump",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Zo9acoIa5n-rt8",
//     "id": "0493",
//     "name": "incline push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XyU7jH7UieUaY8",
//     "id": "3785",
//     "name": "incline push-up (on box)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/72V-OftiMfi=tQ",
//     "id": "0494",
//     "name": "incline reverse grip push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/07Ju3x3adLQ5Ax",
//     "id": "3011",
//     "name": "incline scapula push up",
//     "target": "serratus anterior"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6saz44Ni6ZXfIO",
//     "id": "0495",
//     "name": "incline twisting sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/a0UL_-fUsxxDgi",
//     "id": "1564",
//     "name": "intermediate hip flexor and quad stretch",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QVdZNs_vZIgaUL",
//     "id": "0496",
//     "name": "inverse leg curl (bench support)",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fifmT8y83NP7bk",
//     "id": "2400",
//     "name": "inverse leg curl (on pull-up cable machine)",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VmMcdUiTQevHCi",
//     "id": "0499",
//     "name": "inverted row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bzSnMuG0btdDBz",
//     "id": "2300",
//     "name": "inverted row bent knees",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T4PKOM98+WUw+n",
//     "id": "2298",
//     "name": "inverted row on bench",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oUsbg6Ai458sF-",
//     "id": "0497",
//     "name": "inverted row v. 2",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Dk9Bn6FGoyarXv",
//     "id": "0498",
//     "name": "inverted row with straps",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YxfdPbBbpDPgGp",
//     "id": "1419",
//     "name": "iron cross stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Xon7UdmGiPqbBM",
//     "id": "1297",
//     "name": "isometric chest squeeze",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/K4iR-45geLd0gQ",
//     "id": "0500",
//     "name": "isometric wipers",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ckLeXC3wgawJST",
//     "id": "0501",
//     "name": "jack burpee",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xBRY25-pyBwA3J",
//     "id": "3224",
//     "name": "jack jump (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/61H-irx25fL_jL",
//     "id": "0507",
//     "name": "jackknife sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/niUjZaZZR3fMS5",
//     "id": "0508",
//     "name": "janda sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qN2aWwDsEJm7tl",
//     "id": "2612",
//     "name": "jump rope",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3mSh8YJfmN=K3R",
//     "id": "0514",
//     "name": "jump squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/O9RgnQglkXCdpo",
//     "id": "0513",
//     "name": "jump squat v. 2",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KmhM0D_xUdqzD1",
//     "id": "0517",
//     "name": "kettlebell advanced windmill",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Z3SCnLB5NEodpy",
//     "id": "0518",
//     "name": "kettlebell alternating hang clean",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bqiA_0pfp61K_F",
//     "id": "0520",
//     "name": "kettlebell alternating press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LCQfJDMzMX+=OI",
//     "id": "0519",
//     "name": "kettlebell alternating press on floor",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y0to1Vig2PGrJM",
//     "id": "0521",
//     "name": "kettlebell alternating renegade row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OGpLk207vEHB2r",
//     "id": "0522",
//     "name": "kettlebell alternating row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MOcq5=Huz75IXY",
//     "id": "0523",
//     "name": "kettlebell arnold press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EQ0G5CtXdSZ4JQ",
//     "id": "0524",
//     "name": "kettlebell bent press",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SGv-nM-C5Bc9H7",
//     "id": "0525",
//     "name": "kettlebell bottoms up clean from the hang position",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bDx46a_oXn2ABw",
//     "id": "0526",
//     "name": "kettlebell double alternating hang clean",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Zd8vx-26jy47G=",
//     "id": "0527",
//     "name": "kettlebell double jerk",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ukAmZYNyaGs+Ir",
//     "id": "0528",
//     "name": "kettlebell double push press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UKx63gndSsM1fq",
//     "id": "0529",
//     "name": "kettlebell double snatch",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HI56vtzZcF9q9U",
//     "id": "0530",
//     "name": "kettlebell double windmill",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oXhHGc=gn3GUdv",
//     "id": "0531",
//     "name": "kettlebell extended range one arm press on floor",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wqZS_LdfsxENaQ",
//     "id": "0532",
//     "name": "kettlebell figure 8",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/snb0ipwwCgiNWC",
//     "id": "0533",
//     "name": "kettlebell front squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/u=iTEIuzhIU4sj",
//     "id": "0534",
//     "name": "kettlebell goblet squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vTW18q7RNWp1k=",
//     "id": "0535",
//     "name": "kettlebell hang clean",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/oYX3ngzZluwbZu",
//     "id": "0536",
//     "name": "kettlebell lunge pass through",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LJEeJWyBq-6ueK",
//     "id": "0537",
//     "name": "kettlebell one arm clean and jerk",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_gz+Zoj1Jk8E7B",
//     "id": "1298",
//     "name": "kettlebell one arm floor press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RlVjtU8o4Kow7k",
//     "id": "0538",
//     "name": "kettlebell one arm jerk",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tU+XP2Ug-8jKuC",
//     "id": "0539",
//     "name": "kettlebell one arm military press to the side",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/d7RRfDhQNYkwV9",
//     "id": "0540",
//     "name": "kettlebell one arm push press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=iW088NMs6ID+X",
//     "id": "0541",
//     "name": "kettlebell one arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6GTZjQGEGkpj6w",
//     "id": "0542",
//     "name": "kettlebell one arm snatch",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nTKcY8auWPbQ9s",
//     "id": "0543",
//     "name": "kettlebell pirate supper legs",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3uYW1ZqifXwWVi",
//     "id": "0544",
//     "name": "kettlebell pistol squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lnwuSCB_BnRkM9",
//     "id": "0545",
//     "name": "kettlebell plyo push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SV3k=ppYa7PQWq",
//     "id": "0546",
//     "name": "kettlebell seated press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/D3i+U+QHKhEhN_",
//     "id": "1438",
//     "name": "kettlebell seated two arm military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/I1+SLGut=5TucW",
//     "id": "0547",
//     "name": "kettlebell seesaw press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8u1SeeIa6T7mrM",
//     "id": "0548",
//     "name": "kettlebell sumo high pull",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/q3aEW-m_fZUAp5",
//     "id": "0549",
//     "name": "kettlebell swing",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=X7leKvE8rZct5",
//     "id": "0550",
//     "name": "kettlebell thruster",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FSnl7iaoVk-bOW",
//     "id": "0551",
//     "name": "kettlebell turkish get up (squat style)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qgRYYKTg-XMDKk",
//     "id": "0552",
//     "name": "kettlebell two arm clean",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/K7zbx6OE-QhS36",
//     "id": "0553",
//     "name": "kettlebell two arm military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/TpsadUZ_lNqP4k",
//     "id": "1345",
//     "name": "kettlebell two arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "kettlebell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3O2cjDEB9Lx8C7",
//     "id": "0554",
//     "name": "kettlebell windmill",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2N95WdQH1zS4Zs",
//     "id": "0555",
//     "name": "kick out sit",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2qc1OOgV_YU=a_",
//     "id": "0558",
//     "name": "kipping muscle up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4sozKcW6LT=Y_D",
//     "id": "3640",
//     "name": "knee touch crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tj73A8BopL5ytp",
//     "id": "1420",
//     "name": "kneeling jump squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NnErIcg=bz8+6r",
//     "id": "1346",
//     "name": "kneeling lat stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/NT_AcgK2Mnef85",
//     "id": "3239",
//     "name": "kneeling plank tap shoulder (male)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_nhQ9_E-oMImm8",
//     "id": "3211",
//     "name": "kneeling push-up (male)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cwJTVPhTutgITO",
//     "id": "3288",
//     "name": "korean dips",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IJLSSOEa2=2iu4",
//     "id": "3418",
//     "name": "l-pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wkerVSkFv36HgX",
//     "id": "3419",
//     "name": "l-sit on floor",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uGeozZxWoSvzR+",
//     "id": "0562",
//     "name": "landmine 180",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+66_LL7YOf+_03",
//     "id": "3237",
//     "name": "landmine lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rZT7t-Ew9-EFFf",
//     "id": "3300",
//     "name": "lean planche",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4CvuEhwkv-CJzz",
//     "id": "2271",
//     "name": "left hook. boxing",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qQYeqfQAQsj4mt",
//     "id": "0570",
//     "name": "leg pull in flat bench",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+pO3-2muU7FbYD",
//     "id": "1576",
//     "name": "leg up hamstring stretch",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hMy2pMayNBssun",
//     "id": "2287",
//     "name": "lever alternate leg press ",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xvOPOpg8gPQVZ=",
//     "id": "0571",
//     "name": "lever alternating narrow grip seated row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vJ22JiDnMGLA60",
//     "id": "0572",
//     "name": "lever assisted chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_t9BnR480=dF0=",
//     "id": "0573",
//     "name": "lever back extension",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/d0MTPHnNglMj2I",
//     "id": "0574",
//     "name": "lever bent over row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3Jd_DhhNnzar05",
//     "id": "3200",
//     "name": "lever bent-over row with v-bar ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iL3IHw1mAnTeRX",
//     "id": "0575",
//     "name": "lever bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cDvVzmAvDbon_5",
//     "id": "2289",
//     "name": "lever calf press ",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FMCM9_N5=w56Dx",
//     "id": "0577",
//     "name": "lever chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YJCJ+zRjd=YZLm",
//     "id": "0576",
//     "name": "lever chest press ",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aRGhvYmFMRLz1O",
//     "id": "0578",
//     "name": "lever deadlift ",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_x3Ph5DmY67dgt",
//     "id": "1300",
//     "name": "lever decline chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WtDuqrFYvBSI6_",
//     "id": "1253",
//     "name": "lever donkey calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MYpjG7nYsfx8zZ",
//     "id": "0579",
//     "name": "lever front pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/b6F=IcOWzdmC=a",
//     "id": "0580",
//     "name": "lever gripless shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/b21CIPTFcLL2GX",
//     "id": "1439",
//     "name": "lever gripless shrug v. 2",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T-1KKl2Jvt4Z4P",
//     "id": "2288",
//     "name": "lever gripper hands ",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2v_r_OFqn5EaXJ",
//     "id": "1615",
//     "name": "lever hammer grip preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0ZwaBicl-YEp1f",
//     "id": "0581",
//     "name": "lever high row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9lTzSqiW9J06K9",
//     "id": "2286",
//     "name": "lever hip extension v. 2",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+D28mu56FGndiV",
//     "id": "2611",
//     "name": "lever horizontal one leg press",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XM40yOS2XBWN+N",
//     "id": "1299",
//     "name": "lever incline chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hmiwaJVXcVin0G",
//     "id": "1479",
//     "name": "lever incline chest press v. 2",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eWHK8+UUtJM8MJ",
//     "id": "0582",
//     "name": "lever kneeling leg curl ",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/g78o6e2s_V4SSq",
//     "id": "0583",
//     "name": "lever kneeling twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nVFJjonfNg8rsW",
//     "id": "0584",
//     "name": "lever lateral raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3d7dFazZOgMV=5",
//     "id": "0585",
//     "name": "lever leg extension",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0Upr1g1l=k8IGS",
//     "id": "0586",
//     "name": "lever lying leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mcykfyEvZlPFQI",
//     "id": "3195",
//     "name": "lever lying two-one leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WJc-MVrBsPZrFI",
//     "id": "0587",
//     "name": "lever military press ",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/40eBwzUW4jDK7w",
//     "id": "0588",
//     "name": "lever narrow grip seated row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZnWHBDf=p8rdoM",
//     "id": "0589",
//     "name": "lever one arm bent over row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fJZODdk+MJpR20",
//     "id": "1356",
//     "name": "lever one arm lateral high row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gfgiWoM+85Sq+q",
//     "id": "1347",
//     "name": "lever one arm lateral wide pulldown ",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8ZLuJdlQawy7X8",
//     "id": "0590",
//     "name": "lever one arm shoulder press ",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZcOs-CNTeXf6ZZ",
//     "id": "0591",
//     "name": "lever overhand triceps dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PT-SKaG3rGOdyV",
//     "id": "0592",
//     "name": "lever preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ouuXk48Q6_iHah",
//     "id": "1614",
//     "name": "lever preacher curl v. 2",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x21YoJdoMS5M57",
//     "id": "2285",
//     "name": "lever pullover ",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yDsRPCqHt0dq+m",
//     "id": "2736",
//     "name": "lever reverse grip lateral pulldown ",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hNxzQPajkHTS7V",
//     "id": "1616",
//     "name": "lever reverse grip preacher curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PB+M8bGgEzuNnM",
//     "id": "1348",
//     "name": "lever reverse grip vertical row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fvkZdB77YoqQZ7",
//     "id": "0593",
//     "name": "lever reverse hyperextension ",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kEItj-RprDTzfg",
//     "id": "1349",
//     "name": "lever reverse t-bar row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/K=TrHtdiNXctB_",
//     "id": "2315",
//     "name": "lever rotary calf",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LCr5DFhaKOmQmY",
//     "id": "2335",
//     "name": "lever seated calf press",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/o2AUaFQ_qPYBM9",
//     "id": "0594",
//     "name": "lever seated calf raise ",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Mgov3Zg2wzr6AE",
//     "id": "1452",
//     "name": "lever seated crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wgOt7T1n2Oj3DW",
//     "id": "0595",
//     "name": "lever seated crunch (chest pad)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pLeIlcUbptZ-f6",
//     "id": "3760",
//     "name": "lever seated crunch v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QcN5xDC4=Y2i=r",
//     "id": "1451",
//     "name": "lever seated dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3eC4Auo5+Q+pp5",
//     "id": "0596",
//     "name": "lever seated fly",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-wWgxVBN_XDeFH",
//     "id": "3759",
//     "name": "lever seated good morning",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ii3y=M_MqxTIIn",
//     "id": "0597",
//     "name": "lever seated hip abduction",
//     "target": "abductors"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/i1LcQB6T_DLP0M",
//     "id": "0598",
//     "name": "lever seated hip adduction",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HlCAJ9z3v7yjJc",
//     "id": "0599",
//     "name": "lever seated leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/N4v6vJXhvpoARA",
//     "id": "0600",
//     "name": "lever seated leg raise crunch ",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Z3PfA_s_ljCIRk",
//     "id": "0602",
//     "name": "lever seated reverse fly",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ht8F3IycpTSi4l",
//     "id": "0601",
//     "name": "lever seated reverse fly (parallel grip)",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lUwqRrjCvMiRWW",
//     "id": "1350",
//     "name": "lever seated row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eu1erV6Lh8K0oA",
//     "id": "1385",
//     "name": "lever seated squat calf raise on leg press machine",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/q_yibmjT7PDRmF",
//     "id": "0603",
//     "name": "lever shoulder press ",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1mrQBRDeRjcRAs",
//     "id": "0869",
//     "name": "lever shoulder press  v. 2",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qIbYidGZOcBtOF",
//     "id": "2318",
//     "name": "lever shoulder press  v. 3",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/u8jYPkMXhYm8ze",
//     "id": "0604",
//     "name": "lever shrug ",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tUJSX311VkR6uD",
//     "id": "0605",
//     "name": "lever standing calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zJHX=efVcIA_iR",
//     "id": "3758",
//     "name": "lever standing chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZfvBv+1TSg3Gav",
//     "id": "0606",
//     "name": "lever t bar row ",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Xes_yI3MsHgTIp",
//     "id": "1351",
//     "name": "lever t-bar reverse grip row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6Ar6EbLMHJ=LMj",
//     "id": "0607",
//     "name": "lever triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/w245yUIw-qj661",
//     "id": "1313",
//     "name": "lever unilateral row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6=+WEb79dLRfkH",
//     "id": "0609",
//     "name": "london bridge",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_Ro05+hQB78WPE",
//     "id": "3013",
//     "name": "low glute bridge on floor",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nUq0E7JKKlBFYG",
//     "id": "1352",
//     "name": "lower back curl",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VjfSTEn0Pvv-Ux",
//     "id": "3582",
//     "name": "lunge with jump",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Y2+bDkyREOdLXs",
//     "id": "1688",
//     "name": "lunge with twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/t_5=eKWlkx6pt7",
//     "id": "0613",
//     "name": "lying (side) quads stretch",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Baol3MUc97EszQ",
//     "id": "2312",
//     "name": "lying elbow to knee",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+WWYX84fyEJK=4",
//     "id": "0620",
//     "name": "lying leg raise flat bench",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ShSMpSAG=W3p1G",
//     "id": "0865",
//     "name": "lying leg-hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0t5ZBYUjfzJfIc",
//     "id": "1301",
//     "name": "machine inner chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Kk0lB9mdtEGYUw",
//     "id": "0624",
//     "name": "march sit (wall)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XDxnlI2f8IvdlI",
//     "id": "1353",
//     "name": "medicine ball catch and overhead throw",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dhySOAC1vx1nQQ",
//     "id": "1302",
//     "name": "medicine ball chest pass",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/loDeNjYLy8WnBO",
//     "id": "1303",
//     "name": "medicine ball chest push from 3 point stance",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tczTgllSY3lYz8",
//     "id": "1304",
//     "name": "medicine ball chest push multiple response",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MKJ8i9=wTVKzOW",
//     "id": "1305",
//     "name": "medicine ball chest push single response",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7ddTs5ov5byVd0",
//     "id": "1312",
//     "name": "medicine ball chest push with run release",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/eN8vyBGc7Hd4_c",
//     "id": "1701",
//     "name": "medicine ball close grip push up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hufpJ2QK-feZmd",
//     "id": "1354",
//     "name": "medicine ball overhead slam",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/y4sJRarKU3mmPU",
//     "id": "1750",
//     "name": "medicine ball supine chest throw",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ih6Dl2UYOmWdYR",
//     "id": "0627",
//     "name": "mixed grip chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8gBxKNeGFROHix",
//     "id": "3217",
//     "name": "modified hindu push-up (male)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/VM5sn6GKIBmchZ",
//     "id": "1421",
//     "name": "modified push up to lower arms",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0Cg=2sqe6RVKp-",
//     "id": "0628",
//     "name": "monster walk",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z3EtdM5WV7F6mY",
//     "id": "0630",
//     "name": "mountain climber",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ohTQmoG5HLy_RH",
//     "id": "0631",
//     "name": "muscle up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/e0WXHkNVSOLA2p",
//     "id": "1401",
//     "name": "muscle-up (on vertical bar)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KHgumy8zNjC1Kq",
//     "id": "2328",
//     "name": "narrow push-up on exercise ball",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "neck",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tZ8YrrUS2aYEDk",
//     "id": "1403",
//     "name": "neck side stretch",
//     "target": "levator scapulae"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tLTUSzbFl3jAo3",
//     "id": "0634",
//     "name": "negative crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OWnIqvTUj-eL53",
//     "id": "1495",
//     "name": "oblique crunch v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lxmG66uOK6WM_9",
//     "id": "0635",
//     "name": "oblique crunches floor",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "olympic barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0Y7YlntQS7BlA=",
//     "id": "0636",
//     "name": "olympic barbell hammer curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "olympic barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vpU5PiLxaZ3SuS",
//     "id": "0637",
//     "name": "olympic barbell triceps extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Cgnrg022OX2Z4s",
//     "id": "1355",
//     "name": "one arm against wall",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Mr3eeBl1TvtLYv",
//     "id": "0638",
//     "name": "one arm chin-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/af3OaNPddMRd1c",
//     "id": "0639",
//     "name": "one arm dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yXZOhFtfG+HAX2",
//     "id": "0640",
//     "name": "one arm slam (with medicine ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bhks=d_MwM7E23",
//     "id": "1773",
//     "name": "one arm towel row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kmnpBOeUhqeSHN",
//     "id": "1386",
//     "name": "one leg donkey calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Lmbo5d6stbax4f",
//     "id": "1387",
//     "name": "one leg floor calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HipG7d+LlgPr-q",
//     "id": "1476",
//     "name": "one leg squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PD6zm4V6k-5F8i",
//     "id": "0641",
//     "name": "otis up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+fB+pKTieB+pJn",
//     "id": "0642",
//     "name": "outside leg kick push-up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xfIKOSBmkmkmp6",
//     "id": "0643",
//     "name": "overhead triceps stretch",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lvuBc1tRf7EFST",
//     "id": "3147",
//     "name": "pelvic tilt",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fliRdlHNdf1R=a",
//     "id": "1422",
//     "name": "pelvic tilt into bridge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/S5H0CjCgWvJANL",
//     "id": "1388",
//     "name": "peroneals stretch",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/f4Enw7H3_340cC",
//     "id": "3662",
//     "name": "pike-to-cobra push-up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/tbMR5LA+loeS85",
//     "id": "1306",
//     "name": "plyo push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fYGL6Ye+-fFJ51",
//     "id": "1687",
//     "name": "posterior step to overhead reach",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rXJfq=4kLww6f-",
//     "id": "1389",
//     "name": "posterior tibialis stretch",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lhFDU+kyZIOWSt",
//     "id": "3119",
//     "name": "potty squat",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z6MhH0HbuGMdTL",
//     "id": "3132",
//     "name": "potty squat with support",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/SqsBnNiTt=tNqg",
//     "id": "0648",
//     "name": "power clean",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wDYVYesS=0wUdb",
//     "id": "3665",
//     "name": "power point plank",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Dkalk8Np2ly9hj",
//     "id": "3203",
//     "name": "prisoner half sit-up (male)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/thLNrEDQ4NrG4h",
//     "id": "1707",
//     "name": "prone twist on stability ball",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wE3J82=Y_AUlFI",
//     "id": "0651",
//     "name": "pull up (neutral grip)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5hHszA84zGazK=",
//     "id": "0650",
//     "name": "pull-in (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/I9Biu7dgkCsFAT",
//     "id": "0652",
//     "name": "pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ca_cmrHXDERkDy",
//     "id": "1689",
//     "name": "push and pull bodyweight",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Tb+Nsx_kbV3hGG",
//     "id": "3638",
//     "name": "push to run",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "bosu ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WRbbP+9iwRPlAi",
//     "id": "1307",
//     "name": "push up on bosu ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/94C=liQjMW1oq2",
//     "id": "0662",
//     "name": "push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "bosu ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WC4wUi0F6lnVsu",
//     "id": "0653",
//     "name": "push-up (bosu ball)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/xGLiExKPLXQM9l",
//     "id": "0655",
//     "name": "push-up (on stability ball)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kGI8BP5GTTS8YC",
//     "id": "0656",
//     "name": "push-up (on stability ball)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KYhlSVRsGnXmdY",
//     "id": "0659",
//     "name": "push-up (wall)",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/luJK8y8iMAnbwj",
//     "id": "0658",
//     "name": "push-up (wall) v. 2",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GbnnFubhTBnSZN",
//     "id": "0660",
//     "name": "push-up close-grip off dumbbell",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A70V-U=58E2gjN",
//     "id": "0661",
//     "name": "push-up inside leg kick",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1cPXrh-giT6KF1",
//     "id": "0663",
//     "name": "push-up medicine ball",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LlfURRINdpWWez",
//     "id": "1467",
//     "name": "push-up on lower arms",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DPwU8GkK1OG27z",
//     "id": "3145",
//     "name": "push-up plus",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+sU60oxUXdFXyi",
//     "id": "0664",
//     "name": "push-up to side plank",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Jajgo8mIZ4Ym-2",
//     "id": "3533",
//     "name": "quads",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/XwjCrE6AybZaSB",
//     "id": "3201",
//     "name": "quarter sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7MXuENo_ZivGt2",
//     "id": "3552",
//     "name": "quick feet v. 2",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PvWnnLz+-yahQv",
//     "id": "0666",
//     "name": "raise single arm push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vmWaZmuy2Mc=Uc",
//     "id": "0668",
//     "name": "rear decline bridge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/APt6mXYjTHOaSt",
//     "id": "0669",
//     "name": "rear deltoid stretch",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/woNI6BiN5VZ4_b",
//     "id": "0670",
//     "name": "rear pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gaBi1aw9OtGl2w",
//     "id": "1582",
//     "name": "reclining big toe pose with rope",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hxq9KnEz1msbKt",
//     "id": "3236",
//     "name": "resistance band hip thrusts on knees (female)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H92zaDs3LI36ct",
//     "id": "3007",
//     "name": "resistance band leg extension",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/c44a_HTCc1Sj9O",
//     "id": "3123",
//     "name": "resistance band seated biceps curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HtJeUtcdUSkabF",
//     "id": "3124",
//     "name": "resistance band seated chest press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YxSnbIUqksRdKf",
//     "id": "3006",
//     "name": "resistance band seated hip abduction",
//     "target": "abductors"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v9CTVLXLMOqWpA",
//     "id": "3122",
//     "name": "resistance band seated shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "resistance band",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iQ-DV-+hv7UPYj",
//     "id": "3144",
//     "name": "resistance band seated straight back row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6g+DuudLJjGXvI",
//     "id": "0872",
//     "name": "reverse crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wNyZJdGrgoo53j",
//     "id": "0672",
//     "name": "reverse dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mgeCnot6SVwvJy",
//     "id": "0673",
//     "name": "reverse grip machine lat pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nR-3yeX6ZTt9yk",
//     "id": "0674",
//     "name": "reverse grip pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Nxlb41niK_jDr9",
//     "id": "0675",
//     "name": "reverse hyper extension (on stability ball)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QTXmmUeLqo+oZD",
//     "id": "1423",
//     "name": "reverse hyper on flat bench",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UK_n_IQ6h3Ac3Z",
//     "id": "3663",
//     "name": "reverse plank with leg lift",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rtlIxfVfe8M-tY",
//     "id": "0677",
//     "name": "ring dips",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v4be4aSWLh6aX4",
//     "id": "2571",
//     "name": "rocking frog stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_UL_c1CzObbbvq",
//     "id": "0678",
//     "name": "rocky pull-up pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/R6UiABlppqM4tx",
//     "id": "2208",
//     "name": "roller back stretch",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mEaHgrY7icBQgO",
//     "id": "2204",
//     "name": "roller body saw",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QEa1pDw11bSCrf",
//     "id": "2205",
//     "name": "roller hip lat stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uLDCkqYiXStES9",
//     "id": "2202",
//     "name": "roller hip stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hGt6jIpgjnkqlP",
//     "id": "2206",
//     "name": "roller reverse crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qSVHPckO4kNtto",
//     "id": "2203",
//     "name": "roller seated shoulder flexor depresor retractor",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/S=X7WoT+wDwhSA",
//     "id": "2209",
//     "name": "roller seated single leg shoulder flexor depresor retractor",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/r6J8PS5eFs7=A-",
//     "id": "2207",
//     "name": "roller side lat stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WgkOebkXGyb8jx",
//     "id": "0680",
//     "name": "rope climb",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_Adhzti=FYlxy0",
//     "id": "0685",
//     "name": "run",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1g5FJ4UJRtbA+E",
//     "id": "0684",
//     "name": "run (equipment)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/O7KM57=C8UPsnz",
//     "id": "1585",
//     "name": "runners stretch",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/V1lsb7QyzdeXZ3",
//     "id": "0687",
//     "name": "russian twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/aqaTy2iopvb4rx",
//     "id": "3012",
//     "name": "scapula dips",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lBC1w8ulS-OMW0",
//     "id": "3021",
//     "name": "scapula push-up",
//     "target": "serratus anterior"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H1WCwIK=HnlVjn",
//     "id": "0688",
//     "name": "scapular pull-up",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/62WE55IDu2J85y",
//     "id": "3219",
//     "name": "scissor jumps (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fJXZOfE3NfuXr_",
//     "id": "1390",
//     "name": "seated calf stretch (male)",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/M3YI7su14aDMy4",
//     "id": "1424",
//     "name": "seated glute stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/N68b2425ewyMFp",
//     "id": "0689",
//     "name": "seated leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Nr6_HkMTlZJdm+",
//     "id": "0690",
//     "name": "seated lower back stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KzZIo9bwk255mB",
//     "id": "2567",
//     "name": "seated piriformis stretch",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BRQGVCJHW+gEbw",
//     "id": "0691",
//     "name": "seated side crunch (wall)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/US+-d8dRATRzLn",
//     "id": "1587",
//     "name": "seated wide angle pose sequence",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Jb7eCKv7d-cGgM",
//     "id": "0697",
//     "name": "self assisted inverse leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/geCa1MGpW=vPi1",
//     "id": "1766",
//     "name": "self assisted inverse leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ugZX8+KCh4vvA0",
//     "id": "0696",
//     "name": "self assisted inverse leg curl (on floor)",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5IWqfuYDF0rsPi",
//     "id": "3222",
//     "name": "semi squat jump (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9q-cAtOuWzjxWm",
//     "id": "3656",
//     "name": "short stride run",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6VuJRyGg-IV_Dg",
//     "id": "1763",
//     "name": "shoulder grip pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RZz1a8ra0a7AAt",
//     "id": "3699",
//     "name": "shoulder tap",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_7PZaoRDvf3+iT",
//     "id": "0699",
//     "name": "shoulder tap push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gg_APXOvugeXp7",
//     "id": "1774",
//     "name": "side bridge hip abduction",
//     "target": "abductors"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rTP2xh0J=_fdH2",
//     "id": "0705",
//     "name": "side bridge v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cr8gfdwiBeAukb",
//     "id": "0709",
//     "name": "side hip (on parallel bars)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9P6NqtQ_rIIHCi",
//     "id": "0710",
//     "name": "side hip abduction",
//     "target": "abductors"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/s4eD8reuIW_isG",
//     "id": "1358",
//     "name": "side lying floor stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wvteP5JQ6ILMci",
//     "id": "3667",
//     "name": "side lying hip adduction (male)",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ml=RFthBPSmF8o",
//     "id": "1775",
//     "name": "side plank hip adduction",
//     "target": "adductors"
//   },
//   {
//     "bodyPart": "neck",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UwKb3d-KucmuR2",
//     "id": "0716",
//     "name": "side push neck stretch",
//     "target": "levator scapulae"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nypB5tnlSRkldM",
//     "id": "0717",
//     "name": "side push-up",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1+omZeJr-lFeF5",
//     "id": "0721",
//     "name": "side wrist pull stretch",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rLd5MPnyNqanyQ",
//     "id": "0720",
//     "name": "side-to-side chin",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B5q_Xgnq-SjUx9",
//     "id": "3213",
//     "name": "side-to-side toe touch (male)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/imcI+HrsuvBk5f",
//     "id": "0725",
//     "name": "single arm push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qwntvDGIBGyf4J",
//     "id": "3645",
//     "name": "single leg bridge with outstretched leg",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qlWW02OiWV=uxe",
//     "id": "0727",
//     "name": "single leg calf raise (on a dumbbell)",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Fy0Eromv4ophxE",
//     "id": "0730",
//     "name": "single leg platform slide",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/w=z7WouxjwryEk",
//     "id": "1759",
//     "name": "single leg squat (pistol) male",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/hA8zFT8Vv=64TB",
//     "id": "1489",
//     "name": "sissy squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/fbf+JMnws1R2uW",
//     "id": "0735",
//     "name": "sit-up v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mrqXe+sNTQWWC1",
//     "id": "3679",
//     "name": "sit-up with arms on chest",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kQMzQvA0heUJDF",
//     "id": "3361",
//     "name": "skater hops",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "skierg machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9o3NoLmVl0bKvr",
//     "id": "2142",
//     "name": "ski ergometer",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2TTxT1r-PiU+61",
//     "id": "3671",
//     "name": "ski step",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pNxcJHlZ9b6Pji",
//     "id": "3304",
//     "name": "skin the cat",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x0ZFX=5Vv23y1Z",
//     "id": "1425",
//     "name": "sled 45 degrees one leg press",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sao4rEPZ0BcoUw",
//     "id": "0738",
//     "name": "sled 45в° calf press",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8O5+dXDT4jRr3D",
//     "id": "0739",
//     "name": "sled 45в° leg press",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pe+MdowuHLORSj",
//     "id": "1464",
//     "name": "sled 45в° leg press (back pov)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/j7AuhI-tUulP+U",
//     "id": "1463",
//     "name": "sled 45в° leg press (side pov)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=r0ni-k7rRfEwe",
//     "id": "0740",
//     "name": "sled 45в° leg wide press",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/U=NO8-955WR_l7",
//     "id": "1391",
//     "name": "sled calf press on leg press",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OBJKBUoqZK_ttH",
//     "id": "0741",
//     "name": "sled closer hack squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/26r=dT+xVrK4aV",
//     "id": "0742",
//     "name": "sled forward angled calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/YoIilUkAW=eoSU",
//     "id": "0743",
//     "name": "sled hack squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/-mSmFyiaSFMxPn",
//     "id": "2334",
//     "name": "sled lying calf press",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iLpwQTyln86uEj",
//     "id": "0744",
//     "name": "sled lying squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "sled machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IBxMPMsk-k9arc",
//     "id": "1392",
//     "name": "sled one leg calf press on leg press",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "hammer",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kq+MnSLbKG2enj",
//     "id": "1496",
//     "name": "sledge hammer",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JqmMwc1PTiuHI6",
//     "id": "0746",
//     "name": "smith back shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/H6s6k7SjRHWAGb",
//     "id": "0747",
//     "name": "smith behind neck press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5WXVa0rgj7aRbb",
//     "id": "0748",
//     "name": "smith bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/MsTXFyr6sJd6Ii",
//     "id": "0749",
//     "name": "smith bent knee good morning",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wG4_4VFrsKk8RN",
//     "id": "1359",
//     "name": "smith bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/5vzJMspekpnPx+",
//     "id": "0750",
//     "name": "smith chair squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kt7F6i=8yut88g",
//     "id": "0751",
//     "name": "smith close-grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/69pzFloycIN49b",
//     "id": "0752",
//     "name": "smith deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/OzFvdQw60K6NZP",
//     "id": "0753",
//     "name": "smith decline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Sg7gr2aiI-Pq-y",
//     "id": "0754",
//     "name": "smith decline reverse-grip press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kzZo9a_chl7OLh",
//     "id": "1433",
//     "name": "smith front squat (clean grip)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/a05h9x3qz5xmb5",
//     "id": "3281",
//     "name": "smith full squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4htVLbtvSwozJv",
//     "id": "0755",
//     "name": "smith hack squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/J5xsv85hKdIX+Q",
//     "id": "0756",
//     "name": "smith hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/36tGec7h+uKXYf",
//     "id": "0757",
//     "name": "smith incline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nWxJjxMvZaGZaq",
//     "id": "0758",
//     "name": "smith incline reverse-grip press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/LMox1jfT+ssm=o",
//     "id": "0759",
//     "name": "smith incline shoulder raises",
//     "target": "serratus anterior"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FcWHBvqkrNknPb",
//     "id": "0760",
//     "name": "smith leg press",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rpyyR-mSx5j9Nm",
//     "id": "1434",
//     "name": "smith low bar squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/lp55U=t=3xhiWy",
//     "id": "1683",
//     "name": "smith machine bicep curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p9kd1ONh7ysLsT",
//     "id": "1625",
//     "name": "smith machine decline close grip bench press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_v5m99rhlXA383",
//     "id": "1752",
//     "name": "smith machine incline tricep extension",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Kie9MfZxAERCdc",
//     "id": "1626",
//     "name": "smith machine reverse decline close grip bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gxLZ15vuKHCltK",
//     "id": "0761",
//     "name": "smith narrow row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/n8PavZ=Yq154yy",
//     "id": "1360",
//     "name": "smith one arm row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B6wT-g=1RZe2-u",
//     "id": "1393",
//     "name": "smith one leg floor calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pKmKU4urOvjeZu",
//     "id": "0762",
//     "name": "smith rear delt row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Hju_=hDIQlUxFk",
//     "id": "0763",
//     "name": "smith reverse calf raises",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vT0618pkD_kVko",
//     "id": "1394",
//     "name": "smith reverse calf raises",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1RKoWh8Xtkajcc",
//     "id": "1361",
//     "name": "smith reverse grip bent over row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qkkirf103xZVzf",
//     "id": "0764",
//     "name": "smith reverse-grip press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/y5kGvSmxNoz14J",
//     "id": "1395",
//     "name": "smith seated one leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/M9Ew5-m2+NGCTB",
//     "id": "0765",
//     "name": "smith seated shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/cuzXQWXh00+j4P",
//     "id": "1426",
//     "name": "smith seated wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/B0ZYg0ev+duqP0",
//     "id": "0766",
//     "name": "smith shoulder press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/JJJlNG5jBH-26q",
//     "id": "0767",
//     "name": "smith shrug",
//     "target": "traps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/k=sy5PU8HyiIey",
//     "id": "0768",
//     "name": "smith single leg split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PbG=nfrUesK_+x",
//     "id": "0769",
//     "name": "smith sprint lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/AqxIAEL7q+Pwrz",
//     "id": "0770",
//     "name": "smith squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/paVA8=AXsCyv50",
//     "id": "0771",
//     "name": "smith standing back wrist curl",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sqbK8=HlCa9MyC",
//     "id": "0772",
//     "name": "smith standing behind head military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/y84-8bfODgokDf",
//     "id": "0773",
//     "name": "smith standing leg calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gJ_a7Qs6VssWPH",
//     "id": "0774",
//     "name": "smith standing military press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ymTsyS6hjNoKi0",
//     "id": "3142",
//     "name": "smith sumo squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/T-7H6AYstNYnYg",
//     "id": "1396",
//     "name": "smith toe raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/U+3aetRrbXrt2_",
//     "id": "0775",
//     "name": "smith upright row",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dZ1ncRVZLxRUSs",
//     "id": "1308",
//     "name": "smith wide grip bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "smith machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/HyEeJ_vAvOCYF0",
//     "id": "1309",
//     "name": "smith wide grip decline bench press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/3KRHgitbhW+iFT",
//     "id": "0776",
//     "name": "snatch pull",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "dumbbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GbWUik11vrjwuj",
//     "id": "0777",
//     "name": "spell caster",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Lp=5PcErAVFm0N",
//     "id": "1362",
//     "name": "sphinx",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=51CvG-Gr8am_M",
//     "id": "0778",
//     "name": "spider crawl push up",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/DbJMmqrhJRmOh-",
//     "id": "1363",
//     "name": "spine stretch",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1P7Mgsb+DvM66T",
//     "id": "2329",
//     "name": "spine twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1dNrNd7GEy37xD",
//     "id": "2368",
//     "name": "split squats",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/E99rN1JLw9-Kog",
//     "id": "0786",
//     "name": "squat jerk",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "bosu ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/13779Bukex2Ibv",
//     "id": "1705",
//     "name": "squat on bosu ball",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/zDqNVcaHxFI+nH",
//     "id": "1685",
//     "name": "squat to overhead reach",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vIYzCPa3XgMZOc",
//     "id": "1686",
//     "name": "squat to overhead reach with twist",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "stability ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/W3W+4wmsh8d8Gc",
//     "id": "2297",
//     "name": "stability ball crunch (full range hands behind head)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gyx5MeZ8w4Xzln",
//     "id": "3291",
//     "name": "stalder press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/wawSNQijMfiQcr",
//     "id": "3669",
//     "name": "standing archer",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "barbell",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rNLoVy_tv8DStX",
//     "id": "0788",
//     "name": "standing behind neck press",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/RwEEUFXgwMdA2Z",
//     "id": "1490",
//     "name": "standing calf raise (on a staircase)",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iVa1g8ypAAL=sM",
//     "id": "1397",
//     "name": "standing calves",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4R9RnoB5Hsi2Hz",
//     "id": "1398",
//     "name": "standing calves calf stretch",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "rope",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iL42CTBnik8sHf",
//     "id": "1599",
//     "name": "standing hamstring and calf stretch with strap",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/P27eEgPefyZge1",
//     "id": "0794",
//     "name": "standing lateral stretch",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KFI9KYc8=S+-qZ",
//     "id": "1364",
//     "name": "standing pelvic tilt",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/gh8d8JZ6KjnQRI",
//     "id": "0795",
//     "name": "standing single leg curl",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "wheel roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6v81iHSdopRWJU",
//     "id": "0796",
//     "name": "standing wheel rollerout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_irsM9YgD8NOmI",
//     "id": "3223",
//     "name": "star jump (male)",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "stationary bike",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Mx1EdCJpXXPWEc",
//     "id": "2138",
//     "name": "stationary bike run v. 3",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/pi+ZUZO6Us2vQM",
//     "id": "0798",
//     "name": "stationary bike walk",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+3=wsYsb1sD-G5",
//     "id": "3314",
//     "name": "straddle maltese",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/z5=WYX4-jrs==M",
//     "id": "3298",
//     "name": "straddle planche",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WSfKGnYe2D-N56",
//     "id": "1427",
//     "name": "straight leg outer hip abductor",
//     "target": "abductors"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/+mSBXtK-ERV6ms",
//     "id": "0803",
//     "name": "superman push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/v2PrcAEbgPO2tu",
//     "id": "0805",
//     "name": "suspended abdominal fallout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/ZTYvdUvohMn6B7",
//     "id": "0806",
//     "name": "suspended push-up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6NeXpv4weSlOJR",
//     "id": "0807",
//     "name": "suspended reverse crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Oa0c2-4iAfwt5a",
//     "id": "0808",
//     "name": "suspended row",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KX0TYp6=qOvn-r",
//     "id": "0809",
//     "name": "suspended split squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4ZLtfXKwX9sawu",
//     "id": "3433",
//     "name": "swimmer kicks v. 2 (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bSKlyLwlcBukG-",
//     "id": "3318",
//     "name": "swing 360",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6VvEv+4oLQ-sFf",
//     "id": "1753",
//     "name": "three bench dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "tire",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BC6XXnr71eQRtB",
//     "id": "2459",
//     "name": "tire flip",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "trap bar",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qfsdKAseY4JGSH",
//     "id": "0811",
//     "name": "trap bar deadlift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2_swB2kPe6-f=y",
//     "id": "0814",
//     "name": "triceps dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/vR=yk0mbcNY1yy",
//     "id": "0812",
//     "name": "triceps dip (bench leg)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/kuC-R-9k4TCKxi",
//     "id": "0813",
//     "name": "triceps dip (between benches)",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CpWX1MAgkMQJOW",
//     "id": "0815",
//     "name": "triceps dips floor",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ilt7Kr9CXPgaTS",
//     "id": "0816",
//     "name": "triceps press",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x1oz_iAlmHppgC",
//     "id": "0817",
//     "name": "triceps stretch",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/QGkOLn+mXNjnKS",
//     "id": "0871",
//     "name": "tuck crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "cable",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mPgdtA+rTbvw2B",
//     "id": "0818",
//     "name": "twin handle parallel grip lat pulldown",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yXkv4nGr_R3kpS",
//     "id": "1466",
//     "name": "twist hip lift",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/2=wMfs52bCXykv",
//     "id": "2802",
//     "name": "twisted leg raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BzWaFYr1HGtgPI",
//     "id": "2801",
//     "name": "twisted leg raise (female)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/p=q0qQUiPKJSo-",
//     "id": "3231",
//     "name": "two toe touch (male)",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CuLjn=2J=r=ZNS",
//     "id": "1365",
//     "name": "upper back stretch",
//     "target": "upper back"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6Tr1kRK7MT=I34",
//     "id": "1366",
//     "name": "upward facing dog",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/bCfp=-y+4pLJ88",
//     "id": "3420",
//     "name": "v-sit on floor",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ey1-ayUfQfVcM+",
//     "id": "0826",
//     "name": "vertical leg raise (on parallel bars)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "elliptical machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/_=_oecxqrxm6k1",
//     "id": "2141",
//     "name": "walk elliptical cross trainer",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/P=cxRLhmAIG0Vz",
//     "id": "3655",
//     "name": "walking high knees lunge",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/L-W8+DuhU2y7Fq",
//     "id": "1460",
//     "name": "walking lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "leverage machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/En6ClavptmZgYU",
//     "id": "3666",
//     "name": "walking on incline treadmill",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "stepmill machine",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/dYSruFAG9LJiC_",
//     "id": "2311",
//     "name": "walking on stepmill",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/971JO7W=gZVxq0",
//     "id": "0830",
//     "name": "weighted bench dip",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/IHhZ18QRrNO2Nu",
//     "id": "2987",
//     "name": "weighted close grip chin-up on dip cage",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/FrWFVhw1HAt=d6",
//     "id": "3643",
//     "name": "weighted cossack squats (male)",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/0b4RIFT7HUU0S-",
//     "id": "0832",
//     "name": "weighted crunch",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/G+w2f1-NDK0R3G",
//     "id": "3670",
//     "name": "weighted decline sit-up",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "lower legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KqcPtv0BFZt5CB",
//     "id": "0833",
//     "name": "weighted donkey calf raise",
//     "target": "calves"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6axkqjiJ5cZGW_",
//     "id": "1310",
//     "name": "weighted drop push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/7Js5St34V1VzUf",
//     "id": "2135",
//     "name": "weighted front plank",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/A_0vxvTRTRRaOS",
//     "id": "0834",
//     "name": "weighted front raise",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/C9YWvIMhRRJqXX",
//     "id": "0866",
//     "name": "weighted hanging leg-hip raise",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/EIfEDUuUty8U6e",
//     "id": "0835",
//     "name": "weighted hyperextension (on stability ball)",
//     "target": "spine"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/prs=Flo=PrsFdi",
//     "id": "3641",
//     "name": "weighted kneeling step with swing",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/rPf44mhKc+ZxYJ",
//     "id": "3644",
//     "name": "weighted lunge with swing",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GXgNqdMKrJeWMz",
//     "id": "3286",
//     "name": "weighted muscle up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/CGP6eAALaPRCk2",
//     "id": "3312",
//     "name": "weighted muscle up (on bar)",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uL=Ha=Cx1i7XH+",
//     "id": "3290",
//     "name": "weighted one hand pull up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/UulVdP=bFQtxwp",
//     "id": "0840",
//     "name": "weighted overhead crunch (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/PLXfnKCgMFqXrL",
//     "id": "0841",
//     "name": "weighted pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "shoulders",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/6L4f1uElh1kA1k",
//     "id": "0844",
//     "name": "weighted round arm",
//     "target": "delts"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/BM_S4EG2wyduJl",
//     "id": "0846",
//     "name": "weighted russian twist",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1hsF7O3aBqbY3V",
//     "id": "0845",
//     "name": "weighted russian twist (legs up)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/4Hv--rzXqITy8W",
//     "id": "2371",
//     "name": "weighted russian twist v. 2",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "medicine ball",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/KOQlZo7v8GZNu4",
//     "id": "0847",
//     "name": "weighted seated bicep curl  (on stability ball)",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Ir89XvxGUMHiOp",
//     "id": "0849",
//     "name": "weighted seated twist (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/1viAMoeQUwqvcu",
//     "id": "0850",
//     "name": "weighted side bend (on stability ball)",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/qCH3LF0gm=CT46",
//     "id": "0851",
//     "name": "weighted sissy squat",
//     "target": "quads"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uMT-tZV_LFsJyC",
//     "id": "0852",
//     "name": "weighted squat",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/jqxUq0vKdwajEQ",
//     "id": "0853",
//     "name": "weighted standing curl",
//     "target": "biceps"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Vm+X77QfKfV2IY",
//     "id": "0854",
//     "name": "weighted standing hand squeeze",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/sHN7CGvZkFFINw",
//     "id": "3313",
//     "name": "weighted straight bar dip",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/yyHEJnQ1ip=C3L",
//     "id": "3642",
//     "name": "weighted stretch lunge",
//     "target": "glutes"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Z73i54+vNeqAxM",
//     "id": "0856",
//     "name": "weighted svend press",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/WS1FM-TBAhi4ml",
//     "id": "1754",
//     "name": "weighted three bench dips",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/92=h3RgjIaJTh4",
//     "id": "1755",
//     "name": "weighted tricep dips",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "upper arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/uSnG4ktVDwMpQ7",
//     "id": "1767",
//     "name": "weighted triceps dip on high parallel bars",
//     "target": "triceps"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "wheel roller",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/8ihhU+kZkXr1e0",
//     "id": "0857",
//     "name": "wheel rollerout",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "cardio",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/nIjgSI0Shug8Jz",
//     "id": "3637",
//     "name": "wheel run",
//     "target": "cardiovascular system"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9-OR45zNpg85zg",
//     "id": "1429",
//     "name": "wide grip pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "back",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/Qyedkr1oTyB5VA",
//     "id": "1367",
//     "name": "wide grip rear pull-up",
//     "target": "lats"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/GycSHGc5Si5Por",
//     "id": "1311",
//     "name": "wide hand push up",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "chest",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/9X9QIMmPYqaENk",
//     "id": "2363",
//     "name": "wide-grip chest dip on high parallel bars",
//     "target": "pectorals"
//   },
//   {
//     "bodyPart": "waist",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/iKnHg2vQoL=RyH",
//     "id": "0858",
//     "name": "wind sprints",
//     "target": "abs"
//   },
//   {
//     "bodyPart": "upper legs",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/mUu95b113AF3zU",
//     "id": "1604",
//     "name": "world greatest stretch",
//     "target": "hamstrings"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "body weight",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/=i9XwxXIBNq0Sd",
//     "id": "1428",
//     "name": "wrist circles",
//     "target": "forearms"
//   },
//   {
//     "bodyPart": "lower arms",
//     "equipment": "weighted",
//     "gifUrl": "https://edbv2-ff7foj6vca-uc.a.run.app/image/x-XG+D3NqChfXY",
//     "id": "0859",
//     "name": "wrist rollerer",
//     "target": "forearms"
//   }
// ]
const SearchResults = () => {
  const [value, loading, error] = useDocument(
    doc(db, "List of All Exercises", "res")
  );
  // useEffect(() => {

  //   const getInitialData = async () => {
  //     const options = {
  //       method: "GET",
  //       url: 'https://exercisedb.p.rapidapi.com/exercises', ////// 2
  //       headers: {
  //         'X-RapidAPI-Key': '8922bb81bemsha3476b0f910c70dp1f3246jsn0a9380fb1e3b',
  //         'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  //       }
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);
  //       NewArray = response.data;
  //       const sendDataAgain = async (item) => {
  //         const options = {
  //           method: "GET",
  //           url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${item}`,   ////// 3
  //           headers: {
  //             'X-RapidAPI-Key': '8922bb81bemsha3476b0f910c70dp1f3246jsn0a9380fb1e3b',
  //             'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  //           }
  //         };

  //         try {
  //           const response = await axios.request(options);
  //           console.log(response.data);
  //           console.log(item);
  //           const SendData = async () => {
  //             await setDoc(doc(db, CollectionName, 'res'), {
  //               firstArray: response.data,
  //             });
  //           };
  //           SendData();
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       };
  //       NewArray.forEach((item) => {
  //         console.log("yesinside");
  //         sendDataAgain(item);
  //       });
  //       console.log("new array", NewArray);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getInitialData();
  //   const getData = async () => {
  //     console.log("yesout");
      
  //   };
  //   getData();
  // }, [ID]);

  // useEffect(() => {
  //   const SendData = async () => {
  //     await setDoc(doc(db, CollectionName, 'res'), {
  //       firstArray: AllExercises,
  //     });
  //   };
  //   SendData();
  // },[])
  if(value)console.log(value?.data());

  const { Id } = useParams();
  const Search = useSelector((state: any) => state.exercisename.value);
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1) * recordsNum);
    window.scrollTo({ top: 1700, behavior: "smooth" });
  };
  if (error) console.log(error);
  if (loading) return <Loading />;
  const filtered = value?.data()?.firstArray?.filter((item: any) => {
    return (
      item?.name?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.bodyPart?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.target?.toLowerCase().includes(Search?.toLowerCase())
    );
  });
  return (
    <div>
      <ExercisesContainer>
        {filtered
          ?.slice(selectedNum - recordsNum, selectedNum)
          .map((item: any, index: number) => {
            return (
              <ExerciseCard
                key={index}
                onClick={async () => {
                  await updateDoc(doc(db, "ITEM", "res"), {
                    SELECTEDITEM: item,
                  });
                }}
              >
                <Link to={"/exercises"}>
                  <img
                    height={300}
                    width={300}
                    src={
                      item?.gifUrl[4] === "s"
                        ? item.gifUrl
                        : item.gifUrl.slice(0, 4) + "s" + item.gifUrl.slice(4)
                    }
                    alt={"icon"}
                  />
                  <div className="flex  gap-2">
                    <Target>{item?.target}</Target>
                    <ExerciseName>{item?.bodyPart}</ExerciseName>
                  </div>
                  <h1 className="font-bold p-2 text-center text-ellipsis overflow:hidden">
                    {item?.name}
                  </h1>
                </Link>
              </ExerciseCard>
            );
          })}
        {filtered?.length < 1 && (
          <h1 className="text-2xl text-center mb-10 font-bold">
            No Exercises Found
          </h1>
        )}
      </ExercisesContainer>
      {filtered?.length > 0 && (
        <ReactPaginate
          className="py-7 flex justify-center items-center gap-3"
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLabel="< "
          nextLabel=" >"
          breakLabel="..."
          onPageChange={handlePageClick}
          pageCount={Math.ceil(filtered.length / recordsNum)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          renderOnZeroPageCount={null}
          activeClassName="bg-red-400 text-white px-2 py-[2px] rounded-sm"
        />
      )}
    </div>
  );
};

export default SearchResults;
