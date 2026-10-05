CREATE TABLE `active_visitors` (
	`address_hash` text PRIMARY KEY NOT NULL,
	`last_seen` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_active_visitors_last_seen` ON `active_visitors` (`last_seen`);