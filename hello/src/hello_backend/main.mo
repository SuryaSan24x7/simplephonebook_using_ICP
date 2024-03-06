import Map "mo:base/HashMap";
import Text "mo:base/Text";

actor {

  type Name = Text;
  type Phone = Text;

  type Entry = {
    name: Name;
    desc: Text;
    phone: Phone;
  };

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insert(name: Name, entry: Entry): async Bool {
    if (null != phonebook.get(name)) {
      return false;
    };
    phonebook.put(name, entry);
    return true; 
  };

   public query func lookup(name: Name): async ?Entry {
    let result = phonebook.get(name);
    return result;
  };
  public func delete(name: Name): async Bool {
    if(phonebook.get(name)!=null){
    phonebook.delete(name);
    return true;}
    else 
    {
      return false;
    }
  };

  public func update(name: Name, newEntry: Entry): async Bool {
    if (null != phonebook.get(name)) {
      phonebook.put(name, newEntry);
      return true;
    };
    return false;
  };
};
