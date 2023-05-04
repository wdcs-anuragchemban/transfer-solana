use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction::transfer;

declare_id!("HgUtV1vuny2tZdppdNwaxqzsuPSP5Jq3yZBExTMRxkcm");

#[program]
pub mod transfer_sol {

    use super::*;

    pub fn transfer_sol(ctx: Context<TransferSol>, amount: u64) -> Result<()> {

        invoke(
            &transfer(&ctx.accounts.from.key(), &ctx.accounts.to.key(), amount),
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
                ctx.accounts.system_account.to_account_info(),
            ],
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct TransferSol<'info> {
    /// CHECK:
    #[account(mut)]
    pub from: AccountInfo<'info>,
    /// CHECK:
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub system_account: Program<'info, System>,
}
