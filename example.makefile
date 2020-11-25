flags = --allow-read  
file = index.ts
dev:
	deno run $(flags) $(file) 
doc:
	npx typedoc