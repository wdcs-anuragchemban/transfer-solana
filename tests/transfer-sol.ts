import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TransferSol } from "../target/types/transfer_sol";
import { assert } from "chai";

describe("transfer-sol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();

  const program = anchor.workspace.TransferSol as Program<TransferSol>;
  const systemAccount = anchor.web3.SystemProgram.programId;

  it("Transfer Sol", async () => {
    const toAddress = new anchor.web3.PublicKey(
      "FSVp8VAgP9pfFie1CpwvH5ek9GHkENbS9SavGSuyTVbU"
    );

    const balance = await provider.connection.getBalance(toAddress);

    const tx = await program.methods
      .transferSol(new anchor.BN(1000000))
      .accounts({
        from: provider.publicKey,
        to: toAddress,
        systemAccount: systemAccount,
      })
      .rpc();

    console.log(tx);

    const newBalance = await provider.connection.getBalance(toAddress);

    assert.strictEqual(1000000, newBalance - balance);
  });
});
