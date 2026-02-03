use serde::{Deserialize, Serialize};
use std::io::{self, Read};

#[derive(Deserialize)]
struct Input {
    mission: String,
}

#[derive(Serialize)]
struct Output {
    insight: String,
    confidence: f32,
    revenue_estimate_usd: f32,
}

fn analyze(m: &str) -> Output {
    let lowered = m.to_lowercase();
    if lowered.contains("arbitrag") || lowered.contains("arbitragem") {
        Output {
            insight: format!("Arbitragem detectada para: {}", m),
            confidence: 0.92,
            revenue_estimate_usd: 12.5,
        }
    } else {
        Output {
            insight: format!("Oportunidade geral encontrada para: {}", m),
            confidence: 0.64,
            revenue_estimate_usd: 1.2,
        }
    }
}

fn main() {
    // Leia JSON do stdin (padrão WASI pattern)
    let mut buffer = String::new();
    if let Err(e) = io::stdin().read_to_string(&mut buffer) {
        let err = serde_json::json!({"error": format!("stdin read error: {}", e)});
        println!("{}", err);
        return;
    }

    let input: Result<Input, _> = serde_json::from_str(&buffer);
    match input {
        Ok(i) => {
            let out = analyze(&i.mission);
            let json = serde_json::to_string(&out).unwrap_or_else(|_| "{}".to_string());
            println!("{}", json);
        }
        Err(_) => {
            let err = serde_json::json!({"error":"invalid input json, expected {\"mission\":string}"});
            println!("{}", err);
        }
    }
}
