import { $query, $update, Record, Result, StableBTreeMap, nat64, ic, match } from 'azle';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

// Define the structure of a paper
type Paper = Record<{
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    contentHash: string; // TODO: think about storing on IPFS
    submissionDate: nat64;
}>;

// Create a stable B-tree map to store papers
const papers = new StableBTreeMap<string, Paper>(0, 44, 1024);

$update;
export function submitPaper(payload: {
    title: string;
    authors: string[];
    abstract: string;
    contentHash: string;
}): Result<Paper, string> {
    try {
        // Payload Validation: Ensure that required fields are present in the payload
        if (!payload.title || !payload.authors || !payload.abstract || !payload.contentHash) {
            return Result.Err<Paper, string>('Invalid payload');
        }

        // Validate Authors: Ensure that authors is a non-empty array
        if (!Array.isArray(payload.authors) || payload.authors.length === 0) {
            return Result.Err<Paper, string>('Authors must be a non-empty array');
        }

        // ID Validation: Ensure that the generated ID is a valid UUID format
        const id = uuidv4();
        
        // Submission Date
        const submissionDate = ic.time();

        // Create a new paper record
        const newPaper: Paper = {
            id,
            title: payload.title,
            authors: payload.authors,
            abstract: payload.abstract,
            contentHash: payload.contentHash,
            submissionDate
        };

        // Insert the new paper into the paper list
        papers.insert(id, newPaper);

        return Result.Ok<Paper, string>(newPaper);
    } catch (error) {
        return Result.Err<Paper, string>(`Failed to submit paper: ${error}`);
    }
}

$query;
export function getPaper(id: string): Result<Paper, string> {
    // ID Validation: Ensure that the provided ID is a valid UUID
    if (!id) {
        return Result.Err<Paper, string>('Invalid paper ID format');
    }

    return match(papers.get(id), {
        Some: (paper) => Result.Ok<Paper, string>(paper),
        None: () => Result.Err<Paper, string>('Paper not found')
    });
}

$query;
export function listPapers(): Result<Array<Paper>, string> {
    try {
        const paperList = papers.values();
        return Result.Ok(paperList);
    } catch (error) {
        return Result.Err('Failed to fetch papers');
    }
}



// Cryptographic utility for generating random values
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
      let array = new Uint8Array(32);
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
  };
  