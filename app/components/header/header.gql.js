import {gql} from "@apollo/client";

export const GET_CMS_BLOCK = gql`
    query getCmsBlock($identifiers: [String]) {
  cmsBlocks(identifiers: $identifiers) {
    items {
      identifier
      title
      content
    }
  }
}
`;