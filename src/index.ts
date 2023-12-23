import { $query, $update, Record, Result, StableBTreeMap, nat64, ic, match } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Paper = Record<{
    id: string;
    title: string;
    authors: string[];
    abstract: string;
    contentHash: string; // TODO: Consider storing on IPFS
    submissionTimestamp: nat64;
}>;

const papers = new StableBTreeMap<string, Paper>(0, 44, 1024);

$update;
export function submitPaper(title: string, authors: string[], abstract: string, contentHash: string): Result<Paper, string> {
    const id = uuidv4();
    const submissionTimestamp = ic.time();

    const newPaper: Paper = {
        id,
        title,
        authors,
        abstract,
        contentHash,
        submissionTimestamp
    };

    papers.insert(id, newPaper);
    return Result.Ok<Paper, string>(newPaper);
}

$query;
export function getPaper(id: string): Result<Paper, string> {
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
