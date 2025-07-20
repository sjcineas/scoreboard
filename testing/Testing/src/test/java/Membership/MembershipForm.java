package Membership;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;


public class MembershipForm {
    WebDriver driver;

    @BeforeClass
    void setup(){
        driver=new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/");
        driver.findElement(By.id("FeedIcon")).click();
        driver.get("http://localhost:3000/membershipform"); // Adjust path if different

    }
    @Test(priority = 1)
    void CheckPageLoaded(){

        try {
            Thread.sleep(3000);
            WebElement banner= driver.findElement(By.id("banner"));
            WebElement nsbeLogo= banner.findElement(By.id("nsbe_logo"));
            WebElement PageTitle= banner.findElement(By.id("page_title"));
            //validation for banner
            Assert.assertTrue(nsbeLogo.isDisplayed());
            Assert.assertEquals(PageTitle.getText(),"Membership Stat Sheet");
            //retrieve elements
            WebElement pageTitle = driver.findElement(By.id("page_title"));
            Assert.assertEquals(pageTitle.getText(), "Membership Form");
            WebElement pageSubtitle = driver.findElement(By.id("page_subtitle"));
            Assert.assertEquals(pageSubtitle.getText(), "N S B E @ F I U");



        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
    // 2. NSBE logo is visible in the red header
    @Test(priority = 2)
    void checkLogoVisible() throws InterruptedException {
        Thread.sleep(1000);
        WebElement logo = driver.findElement(By.tagName("img"));      // change locator if needed
        Assert.assertTrue(logo.isDisplayed());
    }

    // 3. Personal Information section header is present
    @Test(priority = 3)
    void personalInformationHeaderPresent() {
        WebElement header = driver.findElement(By.xpath("//*[text()='Personal Information']"));
        Assert.assertTrue(header.isDisplayed());
    }

    // 4–5. All personal-info inputs have correct label and placeholder
    @Test(priority = 4)
    void personalInputFieldsAndPlaceholders() {
        String[][] fields = {
                {"first_name_input",     "First Name"},
                {"last_name_input",      "Last Name"},
                {"major_input",          "Major"},
                {"panther_id_input",     "Panther ID"},
                {"fiu_email_input",      "FIU Email"},
                {"personal_email_input", "Personal Email"},
                {"grad_session_input",   "Grad Session"},
                {"grad_year_input",      "Grad Year"},
                {"phone_number_input",          "Phone Number"}
        };

        // one implicit wait so we don’t need explicit waits everywhere
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(4));

        for (String[] f : fields) {
            WebElement input = driver.findElement(By.id(f[0]));           // ← just the input
            Assert.assertTrue(input.isDisplayed(), "Input "+f[0]+" missing");
            Assert.assertEquals(input.getAttribute("placeholder"), f[1], "Wrong placeholder for "+f[0]);
        }
    }



    // 6. School-status radio buttons visible
    @Test(priority = 5)
    void schoolStatusRadioButtonsVisible() {

        // exact ids (adjust to whatever is in your HTML)
        String[] radioIds = {
                "freshman_label", "sophomore_label", "junior_label", "senior_label", "grad_student_label"};
        for (String id : radioIds) {
            WebElement radio = driver.findElement(By.id(id));
            Assert.assertTrue(radio.isDisplayed(), "Radio "+id+" not visible");
        }

    }

    // 7. Only one school-status selectable at a time
    @Test(priority = 6)
    void onlyOneStatusSelectable() {
        WebElement jr = driver.findElement(By.id("junior_label"));   // adjust IDs
        WebElement sr = driver.findElement(By.id("senior_label"));
        jr.click();
        Assert.assertTrue(jr.isSelected() && !sr.isSelected());
        sr.click();
        Assert.assertTrue(sr.isSelected() && !jr.isSelected());
    }

    // 8. Typing works in all personal fields
    @Test(priority = 7)
    void typingIntoAllFields() {
        driver.findElement(By.id("first_name")).sendKeys("Sam");
        driver.findElement(By.id("last_name")).sendKeys("Howard");
        driver.findElement(By.id("major")).sendKeys("CS");
        driver.findElement(By.id("panther_id")).sendKeys("1234567");
        driver.findElement(By.id("fiu_email")).sendKeys("sam@fiu.edu");
        driver.findElement(By.id("personal_email")).sendKeys("sam@gmail.com");
        driver.findElement(By.id("grad_session")).sendKeys("Fall");
        driver.findElement(By.id("grad_year")).sendKeys("2027");
        driver.findElement(By.id("phone")).sendKeys("5551234567");
        Assert.assertEquals(driver.findElement(By.id("first_name")).getAttribute("value"), "Sam");
    }

    // 9. Submit button visible and styled
    @Test(priority = 8)
    void submitButtonVisible() {
        WebElement btn = driver.findElement(By.id("submit_button"));
        Assert.assertTrue(btn.isDisplayed() && btn.isEnabled());
    }

    // 10. Success alert appears after valid submission
    @Test(priority = 9)
    void successAlertOnValidSubmit() {
        driver.findElement(By.id("submit_button")).click();
        Alert a = driver.switchTo().alert();
        Assert.assertTrue(a.getText().toLowerCase().contains("success"));
        a.accept();
    }

    // 11. Error alert when required field missing
    @Test(priority = 10)
    void errorAlertOnMissingField() {
        driver.navigate().refresh();                     // clear the form quickly
        driver.findElement(By.id("submit_button")).click();
        Alert a = driver.switchTo().alert();
        Assert.assertTrue(a.getText().toLowerCase().contains("error"));
        a.accept();
    }

    // 12. Mobile layout has no horizontal scroll at 480 px width
    @Test(priority = 11)
    void mobileLayoutNoHorizontalScroll() {
        driver.manage().window().setSize(new Dimension(480, 800));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        long bodyWidth   = (Long) js.executeScript("return document.body.scrollWidth;");
        long clientWidth = (Long) js.executeScript("return document.documentElement.clientWidth;");
        Assert.assertTrue(bodyWidth <= clientWidth, "Page scrolls horizontally on mobile width");
    }

}
