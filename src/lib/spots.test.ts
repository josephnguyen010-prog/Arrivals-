import { describe, expect, it } from "vitest";
import { linkLabel, safeUrl } from "./spots";

describe("safeUrl", () => {
  it("keeps a full https url", () => {
    expect(safeUrl("https://maps.app.goo.gl/abc")).toBe("https://maps.app.goo.gl/abc");
  });

  it("keeps http as well as https", () => {
    expect(safeUrl("http://example.com/x")).toBe("http://example.com/x");
  });

  it("assumes https when someone pastes a bare host", () => {
    expect(safeUrl("maps.google.com/place/x")).toBe("https://maps.google.com/place/x");
  });

  it("rejects javascript urls", () => {
    expect(safeUrl("javascript:alert(1)")).toBeNull();
    expect(safeUrl("JavaScript:alert(1)")).toBeNull();
    expect(safeUrl("  javascript:alert(1)  ")).toBeNull();
  });

  it("rejects data and file urls", () => {
    expect(safeUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(safeUrl("file:///etc/passwd")).toBeNull();
  });

  it("rejects other schemes", () => {
    expect(safeUrl("ftp://example.com")).toBeNull();
    expect(safeUrl("mailto:someone@example.com")).toBeNull();
  });

  it("rejects something that isn't a host at all", () => {
    expect(safeUrl("just some words")).toBeNull();
    expect(safeUrl("localhost")).toBeNull();
  });

  it("treats empty input as no link rather than an error", () => {
    expect(safeUrl("")).toBeNull();
    expect(safeUrl("   ")).toBeNull();
  });
});

describe("linkLabel", () => {
  it("shows the host without the www", () => {
    expect(linkLabel("https://www.example.com/a/b")).toBe("example.com");
  });

  it("shows the host for a maps short link", () => {
    expect(linkLabel("https://maps.app.goo.gl/abc")).toBe("maps.app.goo.gl");
  });
});
