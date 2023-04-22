import { groq } from "next-sanity";

export const imageAssetFields = groq`
    _id,
    url,
    metadata {
        dimensions,
        palette,
        lqip
    }
`;

export const catFields = groq`
  name,
  "slug": slug.current,
  "avatar": avatar.asset->{
    ${imageAssetFields}
  },
  favouriteToys[]->{name, "slug": slug.current},
  biography,
  measurements,
  gender,
  adopted,
  dateOfBirth,
  dateOfDeath,
  showInMeetTheCats,
`;

export const timelineFields = groq`
    cats[]->{name, "slug": slug.current},
    action,
    date,
`;

export const galleryItemFields = groq`
    cats[]->{name, "slug": slug.current},
    "image": image.asset->{
        ${imageAssetFields}
    },
    description,
    date,
`;
