# Decentralized Academic Paper Repository (DAPR)

## Overview

DAPR is a blockchain-based system built on the Internet Computer Protocol (ICP) using Azle and TypeScript. It provides an immutable, transparent platform for academic paper submission and retrieval. Future plans include integration with IPFS for off-chain storage of paper content, enhancing data integrity and accessibility.

## Prerequisites

- Node.js
- TypeScript
- DFX (DFINITY Canister SDK)
- Internet Computer CDK (Canister Development Kit)
- Basic understanding of IPFS (for future integration)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/0xzre/icp-2.git
    cd icp-2
    ```

## Project Structure

- **`src/`**: Contains the TypeScript source code for DAPR.
  - **`index.ts`**: Main implementation file for the smart contract.
- **`node_modules/`**: Node.js project dependencies.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript compiler configuration.
- **`LICENSE`**: Project's license file.
- **`README.md`**: Project documentation.

## Smart Contract Functions

### `submitPaper(title: string, authors: string[], abstract: string, contentHash: string): Result<Paper, string>`

- Submits a new academic paper with the given title, authors, abstract, and IPFS content hash.

### `getPaper(id: string): Result<Paper, string>`

- Retrieves the details of a paper identified by its unique ID.

### `listPapers(): Paper[]`

- Lists all submitted academic papers.

## Future Plans for IPFS Integration

- **Paper Content Storage**: Papers will be stored on IPFS, and DAPR will store the corresponding IPFS content hashes. This ensures paper content integrity and decentralization.
- **Retrieval of Papers**: Users will retrieve the paper metadata from DAPR and use the content hash to fetch the actual content directly from IPFS.
- **Enhanced Data Integrity**: By using IPFS, DAPR ensures that the paper contents are tamper-proof and permanently accessible.

## Usage

### Running DAPR Locally

1. **Install DFX:**

    ```bash
    sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
    ```

2. **Start a Local Internet Computer Replica:**

    ```bash
    dfx start --background
    ```

3. **Deploy DAPR Canister Locally:**

    ```bash
    dfx deploy
    ```

### Interacting with DAPR Canister

- Submit a paper:
    ```bash
    dfx canister call DAPR submitPaper '("Paper Title", ["Author1", "Author2"], "Abstract of the paper", "IPFS_content_hash")'
    ```
- Retrieve a paper:
    ```bash
    dfx canister call DAPR getPaper '("paper_id")'
    ```
- List all papers:
    ```bash
    dfx canister call DAPR listPapers
    ```