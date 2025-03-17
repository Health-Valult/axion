use std::error::Error;

use mongodb::options::{ClientOptions, ResolverConfig};
use mongodb::Client;
use tokio;
use tokio::time::{sleep,Duration};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {

    let client_uri ="";
    // A Client is needed to connect to MongoDB:
    // An extra line of code to work around a DNS issue on Windows:
    let options =
        ClientOptions::parse_with_resolver_config(&client_uri, ResolverConfig::cloudflare())
            .await?;
    let client = Client::with_options(options)?;
    // Print the databases in our MongoDB cluster:
    println!("Databases:");
    for name in client.list_database_names(None, None).await? {
        println!("- {}", name);
    }
    


    loop{
        println!("hello");
        sleep(Duration::from_secs(10)).await;
    }
    
}
