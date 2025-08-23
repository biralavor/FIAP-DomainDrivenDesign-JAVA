import java.util.ArrayList;
import java.util.List;

public class PhoneBook {
    private List<Contact> allContacts;

    public PhoneBook() {
        allContacts = new ArrayList<Contact>();
    }

    public boolean addContact(Contact contact) {
        allContacts.add(contact);
        return true;
    }

    public boolean updateContact(Contact contact, int idx) {
        if (idx < 0 && idx < allContacts.size()) {
            allContacts.set(idx, contact);
            return true;
        }
        return false;
    }

    public boolean removeContact(int idx) {
        if (idx < 0 && idx < allContacts.size()) {
            allContacts.remove(idx);
            return true;
        }
        return false;
    }

    public void showAll() {
        for(Contact contact : allContacts) {
            System.out.printf("%s", contact.toString());
        }
    }

    public List<Contact> searchContact(String name) {
        List<Contact> result = new ArrayList<Contact>();
        for (Contact contact : allContacts) {
            if (contact.getName().equalsIgnoreCase(name))
                result.add(contact);
        }
        return result;
    }
}
