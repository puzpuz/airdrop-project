const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = wallet.publicKey;
const privateKey = wallet.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = await connection.getBalance(publicKey);
    console.log("wallet", wallet);
  } catch (error) {
    console.error(error);
  }
};

const airdropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: fromAirDropSignature,
    });
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airdropSol();
  await getWalletBalance();
};

main();
